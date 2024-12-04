import { h } from "preact";
import style from "./styles.css";
import { useEffect, useState } from "preact/hooks";

type FancyButtonProps = {
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
};

export const FancyButton = (props: FancyButtonProps) => {
    const [ripples, setRipples] = useState([]);
    const [ripplesFinished, setRipplesFinished] = useState(0);

    const handleClick = (e) => {
        if(props.disabled) 
            return;

        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        const id = Math.random().toString(36).substring(7);

        const newRipple = {
            x,
            y,
            size,
            id,
        };

        setRipples((prevRipples) => [...prevRipples, newRipple]);

        setTimeout(() => {
            setRipplesFinished((prevRipplesFinished) => prevRipplesFinished + 1);
        }, 600);

        if (props.onClick) {
            props.onClick();
        }
    };

    useEffect(() => {
        if (ripplesFinished >= ripples.length) {
            setRipples([]);
            setRipplesFinished(0);
        }
    }, [ripplesFinished, ripples.length]);

    return (
        <div class={`${style.buttonRippleContainer} ${props.disabled?style.buttonRippleContainerDisabled:""}`}>
            {ripples.map((ripple, index) => (
                <div
                    key={index}
                    id={ripple.id}
                    class={style.buttonRipple}
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size,
                    }}
                />
            ))}
            <button onClick={handleClick} class={`${style.buttonCore} ${props.disabled?style.buttonCoreDisabled:""}`}>
                {props.children}
            </button>
        </div>

    );
}