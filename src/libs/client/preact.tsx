/*
Configuración: No tocar. si tienes problema comunicarte en esta parte con vigilio
*/
import {
    type FunctionComponent,
    type JSX,
    render as renderPreact,
} from "preact";
import { Suspense } from "preact/compat";
import { c } from "@vigilio/sweet";

function Provider(
    el: Element,
    children: JSX.Element | JSX.Element[],
    fallback: null | JSX.Element | JSX.Element[] = null
) {
    return renderPreact(
        <Suspense fallback={fallback}>{children}</Suspense>,
        el
    );
}

export function render(
    element: string,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    Component: FunctionComponent<any>,
    fallback: null | JSX.Element | JSX.Element[] = null
) {
    console.log({ element });

    const name = nameTemplate(element);
    function escapeSelector(selector: string) {
        return selector.replace(/\[/g, "\\[").replace(/\]/g, "\\]");
    }

    console.log({ name });

    const elements = document.querySelectorAll(name);
    console.log({ elements });

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let props: any = {};
    // biome-ignore lint/complexity/noForEach: <explanation>
    elements.forEach((el) => {
        if (el) {
            for (const [_key, value] of Object.entries(el?.attributes)) {
                const printValue: string = value.name.startsWith(":")
                    ? JSON.parse(value.value)
                    : value.value;
                const printName: string = value.name.startsWith(":")
                    ? value.name.slice(1)
                    : value.name;
                props = { ...props, [printName]: printValue };
            }
            Provider(el, <Component {...props} />, fallback);
        }
    });
}
function nameTemplate(text: string) {
    //!poner el nombrte asi blog-index blog-[index] sin
    console.log({ text });

    const key = text
        .toLowerCase()
        .replaceAll("/", "-")
        .replaceAll(".tsx", "")
        .replaceAll(".jsx", "")
        .slice(2);
    console.log({ key });

    const name =
        key === "index"
            ? "index"
            : key.endsWith("/index")
            ? `${key.slice(1, -5)}`
            : key;

    return key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function reactComponent(
    children: JSX.Element | JSX.Element[],
    fallback: null | JSX.Element | JSX.Element[] = null
) {
    const div = c("div", { className: "w-full text-start" });
    Provider(div, children, fallback);
    return div as HTMLElement;
}
