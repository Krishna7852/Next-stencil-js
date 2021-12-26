
import {
  applyPolyfills,
  defineCustomElements,
  JSX as LocalJSX
} from '@digital_components/kb-core/loader';
// To import multiple library
// import { defineCustomElements as ceCore } from '@digital_components/sample-core/loader';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

type StencilProps<T> = {
  [P in keyof T]?: Omit<T[P], 'ref'> | HTMLAttributes<T>;
};

type ReactProps<T> = {
  [P in keyof T]?: DetailedHTMLProps<HTMLAttributes<T[P]>, T[P]>;
};

type StencilToReact<T = LocalJSX.IntrinsicElements, U = HTMLElementTagNameMap> = StencilProps<T> & ReactProps<U>;

declare global {
  export namespace JSX {
    interface IntrinsicElements extends StencilToReact {}
  }
}

applyPolyfills().then(() => {
  if (typeof window !== 'undefined') {
    defineCustomElements(window);
    // ceCore(window);
  }
});
