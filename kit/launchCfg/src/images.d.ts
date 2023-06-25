type SvgrComponent = React.FunctionComponent<React.SVGAttributes<SVGElement>>;

export declare module '*.svg' {
  const value: SvgrComponent;
  export default value;
}

export declare module '*.png';
export declare module '*.jpg';
export declare module '*.jpeg';
