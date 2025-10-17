declare module "lenis/dist/lenis-react" {
  import * as React from "react";

  export interface ReactLenisProps {
    root?: boolean;
    options?: Record<string, any>;
    children?: React.ReactNode;
  }

  export const ReactLenis: React.FC<ReactLenisProps>;

  export default ReactLenis;
}
