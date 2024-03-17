import React from 'react';
import './styles.css';

interface IconProps {
    type: string;
    className?: string;
    onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ type, className, ...rest }) => {
    const icons: { [key: string]: string } = {
        search: 'search.svg',
        loading: 'loading.svg',
        cancel: 'cancel.svg',
    };

    const classNames = `icon ${className}`;

    return (
        <div className={classNames} {...rest}><img src={`/${icons[type]}`}/></div>
    );
};

export default Icon;