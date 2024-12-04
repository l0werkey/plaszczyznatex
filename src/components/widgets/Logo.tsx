import { h } from 'preact';
import './styles.css';

type LogoProps = {
    size?: number;
};

const Logo = (props: LogoProps) => (
    <svg width={props.size} height={props.size} version="1.1" viewBox="0 0 135.47 135.47" xmlns="http://www.w3.org/2000/svg">
        <g transform="matrix(.64298 .14727 -.46709 .73441 55.82 8.561)" stroke-linecap="round">
            <rect x="11.951" y="11.906" width="111.56" height="111.66" fill="var(--logo-bg-color)" stroke-linejoin="bevel" stroke-width=".80129" style="paint-order:markers stroke fill" />
            <path d="m10.799 10.799v113.87h113.87v-113.87h-108.52zm5.3537 5.3537h48.904v48.904h-48.904zm54.257 0h48.905v48.904h-48.905zm-54.257 54.257h48.904v48.905h-48.904zm54.257 0h48.905v48.905h-48.905z" fill="var(--logo-border-color)" stroke="var(--logo-border-color)" stroke-width="5.3704" style="paint-order:markers stroke fill" />
        </g>
    </svg>
);

export default Logo;
