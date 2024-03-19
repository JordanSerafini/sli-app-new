import React from "react";

interface ButtonProps<T extends React.MouseEvent<HTMLButtonElement>> {
    title: string;
    onClick: (e: T) => void;
    css?: string;
}

function Button<T extends React.MouseEvent<HTMLButtonElement>>({ title, onClick, css }: ButtonProps<T>) {
    return (
        <button onClick={onClick as React.MouseEventHandler<HTMLButtonElement>} className={`${css} bg-primary text-white p-2 `}>{title}</button>
    );
}

export default Button;
