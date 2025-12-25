"use client";

import React, { useState } from 'react';
import styles from './CopyButton.module.css';
import { FaMarkdown, FaCheck } from 'react-icons/fa';

interface CopyButtonProps {
    htmlContent: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ htmlContent }) => {
    const [copied, setCopied] = useState(false);

    const htmlToMarkdown = (html: string): string => {
        if (typeof window === 'undefined') return '';

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        let markdown = '';

        const processNode = (node: Node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                markdown += node.textContent;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const el = node as HTMLElement;
                const tagName = el.tagName.toLowerCase();

                switch (tagName) {
                    case 'h1':
                        markdown += '\n# ';
                        el.childNodes.forEach(processNode);
                        markdown += '\n\n';
                        break;
                    case 'h2':
                        markdown += '\n## ';
                        el.childNodes.forEach(processNode);
                        markdown += '\n\n';
                        break;
                    case 'h3':
                        markdown += '\n### ';
                        el.childNodes.forEach(processNode);
                        markdown += '\n\n';
                        break;
                    case 'p':
                        el.childNodes.forEach(processNode);
                        markdown += '\n\n';
                        break;
                    case 'strong':
                    case 'b':
                        markdown += '**';
                        el.childNodes.forEach(processNode);
                        markdown += '**';
                        break;
                    case 'em':
                    case 'i':
                        markdown += '_';
                        el.childNodes.forEach(processNode);
                        markdown += '_';
                        break;
                    case 'a':
                        markdown += '[';
                        el.childNodes.forEach(processNode);
                        markdown += `](${el.getAttribute('href')})`;
                        break;
                    case 'img':
                        markdown += `![${el.getAttribute('alt') || ''}](${el.getAttribute('src')})`;
                        break;
                    case 'ul':
                        el.childNodes.forEach(child => {
                            if (child.nodeName.toLowerCase() === 'li') {
                                markdown += '- ';
                                child.childNodes.forEach(processNode);
                                markdown += '\n';
                            }
                        });
                        markdown += '\n';
                        break;
                    case 'ol':
                        let index = 1;
                        el.childNodes.forEach(child => {
                            if (child.nodeName.toLowerCase() === 'li') {
                                markdown += `${index}. `;
                                child.childNodes.forEach(processNode);
                                markdown += '\n';
                                index++;
                            }
                        });
                        markdown += '\n';
                        break;
                    case 'code':
                        markdown += '`';
                        el.childNodes.forEach(processNode);
                        markdown += '`';
                        break;
                    case 'pre':
                        markdown += '\n```\n';
                        el.childNodes.forEach(processNode);
                        markdown += '\n```\n\n';
                        break;
                    case 'br':
                        markdown += '\n';
                        break;
                    default:
                        el.childNodes.forEach(processNode);
                }
            }
        };

        doc.body.childNodes.forEach(processNode);
        return markdown.trim();
    };

    const handleCopy = async () => {
        try {
            const markdown = htmlToMarkdown(htmlContent);
            await navigator.clipboard.writeText(markdown);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className={styles.buttonWrap}>
            <button
                className={styles.glassButton}
                onClick={handleCopy}
                aria-label="Copiar como Markdown"
            >
                <span className={styles.buttonText}>
                    {copied ? (
                        <span className="flex items-center gap-2 text-green-600">
                            <FaCheck /> Copiado!
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <FaMarkdown className="text-xl" /> Copiar MD
                        </span>
                    )}
                </span>
                <div className={styles.buttonShine}></div>
            </button>
        </div>
    );
};
