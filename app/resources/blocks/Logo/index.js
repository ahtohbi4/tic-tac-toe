import React from 'react';

import './styles.css';

/**
 * @class
 * @extends Component
 */
export default function Logo() {
    return (
        <svg width="77" height="56" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 77 56">
            <g className="logo__opacity">
                <line className="logo__white" x1="18.5" y1="0" x2="18.5" y2="56" />
                <rect x="18" y="0" className="logo__white" width="1" height="56" />
                <line className="logo__white" x1="37.5" y1="0" x2="37.5" y2="56" />
                <rect x="37" y="0" className="logo__white" width="1" height="56" />
            </g>
            <rect x="1" y="1" className="logo__yellow" width="16" height="16" />
            <rect x="20" y="1" className="logo__purple" width="16" height="16" />
            <rect x="20" y="20" className="logo__yellow" width="16" height="16" />
            <rect x="1" y="39" className="logo__pink" width="16" height="16" />
            <rect x="20" y="39" className="logo__green" width="16" height="16" />
            <g className="logo__opacity">
                <line className="logo__grid" x1="77" y1="18.5" x2="77" y2="18.5" />
                <polygon className="logo__white" points="77,18.5 77,18 0,18 0,19 77,19" />
                <line className="logo__grid" x1="77" y1="37.5" x2="77" y2="37.5" />
                <polygon className="logo__white" points="0,37 0,38 77,38 77,37.5 77,37" />
            </g>
            <path className="logo__white" d="M46.5,6.3h-2.8V4.4h7.8v1.9h-2.8v8h-2.2V6.3z" />
            <path className="logo__white" d="M52.6,4.4h2.2v9.9h-2.2V4.4z" />
            <path
                className="logo__white"
                d="M63.3,7c-.2-.3-.5-.5-.8-.6c-.3-.1-.7-.2-1.1-.2s-.8,.1-1.1,.2c-.4,.2-.7,.4-.9,.7c-.3,.3-.5,.6-.6,1c
                -.1,.4-.2,.8-.2,1.3c0,.5,.1,.9,.2,1.3s.3,.7,.6,1s.5,.5,.9,.7s.7,.2,1.1,.2c.4,0,.8-.1,1.2-.3s.6-.4,.9-.8
                l1.8,1.4c-.4,.6-1,1-1.6,1.3c-.6,.3-1.3,.4-2,.4c-.8,0-1.5-.1-2.1-.4c-.7-.2-1.2-.6-1.7-1c-.5-.5-.8-1-1.1
                -1.6s-.4-1.4-.4-2.2c0-.8,.1-1.5,.4-2.2s.6-1.2,1.1-1.6c.5-.5,1-.8,1.7-1c.7-.2,1.4-.4,2.1-.4c.3,0,.6,0,.9,
                .1c.3,.1,.6,.1,.9,.2c.3,.1,.6,.3,.8,.4c.3,.2,.5,.4,.7,.7L63.3,7z"
            />
            <path className="logo__white" d="M46.5,25.3h-2.8v-1.9h7.8v1.9h-2.8v8h-2.2V25.3z" />
            <path
                className="logo__white"
                d="M54.6,23.4h1.8l4.3,9.9h-2.5l-.9-2.1h-3.8l-.8,2.1h-2.4L54.6,23.4z M55.5,26.2l-1.2,3.1h2.4L55.5,26.2z"
            />
            <path
                className="logo__white"
                d="M68.2,25.9c-.2-.3-.5-.5-.8-.6c-.3-.1-.7-.2-1.1-.2s-.8,.1-1.1,.2c-.4,.2-.7,.4-.9,.7c-.3,.3-.5,.6-.6,1
                s-.2,.8-.2,1.3c0,.5,.1,.9,.2,1.3c.1,.4,.3,.7,.6,1c.3,.3,.5,.5,.9,.7c.3,.2,.7,.2,1.1,.2c.4,0,.8-0.1,1.2
                -.3c.3-.2,.6-.4,.9-.8l1.8,1.4c-.4,.6-1,1-1.6,1.3c-.6,.3-1.3,.4-2,.4c-.8,0-1.5-.1-2.1-.4c-.7-.2-1.2-.6
                -1.7-1c-.5-.5-.8-1-1.1-1.6c-.3-.6-.4-1.4-.4-2.2c0-.8,.1-1.5,.4-2.2s.6-1.2,1.1-1.6c.5-.5,1-.8,1.7-1c.7
                -.2,1.4-.4,2.1-.4c.3,0,.6,0,.9,.1c.3,.1,.6,.1,.9,.2c.3,.1,.6,.3,.8,.4c.3,.2,.5,.4,.7,.7L68.2,25.9z"
            />
            <path className="logo__white" d="M46.5,44.3h-2.8v-1.9h7.8v1.9h-2.8v8h-2.2V44.3z" />
            <path
                className="logo__white"
                d="M52.1,47.3c0-.8,.1-1.5,.4-2.2c.3-.6,.6-1.2,1.1-1.6c.5-.5,1-.8,1.7-1c.7-.2,1.4-.4,2.1-.4c.8,0,1.5,.1,
                2.1,.4c.7,.2,1.2,.6,1.7,1s.8,1,1.1,1.6c.3,.6,.4,1.4,.4,2.2c0,.8-.1,1.5-.4,2.2c-.3,.6-.6,1.2-1.1,1.6c-.5,
                .5-1,.8-1.7,1c-.7,.2-1.4,.4-2.1,.4c-.8,0-1.5-.1-2.1-.4c-.7-.2-1.2-.6-1.7-1c-.5-.5-.8-1-1.1-1.6C52.2,
                48.8,52.1,48.1,52.1,47.3z M54.4,47.3c0,.5,.1,.9,.2,1.3s.4,.7,.6,1c.3,.3,.6,.5,1,.7c.4,.2,.8,.2,1.3,.2
                c.5,0,.9-.1,1.3-.2c.4-.2,.7-.4,1-.7c.3-.3,.5-.6,.6-1c.1-.4,.2-.8,.2-1.3c0-.5-.1-.9-.2-1.3c-.1-.4-.4-.7
                -.6-1c-.3-.3-.6-.5-1-.7c-.4-.2-.8-.2-1.3-.2c-.5,0-.9,.1-1.3,.2c-.4,.2-.7,.4-1,.7c-.3,.3-.5,.6-.6,1C54.5,
                46.4,54.4,46.8,54.4,47.3z"
            />
            <path className="logo__white" d="M64.4,42.3h6.7v2h-4.6v1.8h4.3v2h-4.3v2h4.8v2h-7V42.3z" />
        </svg>
    );
}
