import { type MouseEvent, useCallback, useEffect, useState } from "react";
import mermaid, { type RenderResult } from "mermaid";

import { icons } from "@iconify-json/logos";

export interface MermaidDiagramProps {
  children: string;
  id?: string;
  testId?: string;
  className?: string;
  onClick?: (
    event: MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => void;
  onError?: (error: string) => void;
}

export const MermaidViewer = (props: MermaidDiagramProps) => {
  const [element, setElement] = useState<HTMLDivElement>();
  const [render_result, setRenderResult] = useState<RenderResult>();

  const container_id = `${props.id ?? `d${Date.now()}`}-mermaid`;
  const diagram_text = props.children;

  useEffect(() => {
    // Register the icon pack
    mermaid.registerIconPacks([
      {
        name: icons.prefix,
        icons,
      },
    ]);

    // Initialize mermaid
    mermaid.initialize({
      startOnLoad: true,
      logLevel: 5,
    });
  }, []);

  useEffect(() => {
    mermaid.contentLoaded();
  }, []);

  const updateDiagramRef = useCallback((elem: HTMLDivElement) => {
    if (!elem) return;
    setElement(elem);
  }, []);

  // hook to update the component when either the element or the rendered diagram changes
  useEffect(() => {
    if (!element) return;
    if (!render_result?.svg) return;
    element.innerHTML = render_result.svg;
    render_result.bindFunctions?.(element);
  }, [element, render_result]);

  // hook to handle the diagram rendering
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!diagram_text && diagram_text.length === 0) return;
    // create async function inside useEffect to cope with async mermaid.run
    (async () => {
      try {
        const rr = await mermaid.render(`${container_id}-svg`, diagram_text);
        setRenderResult(rr);
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } catch (e: any) {
        props.onError?.(e);
      }
    })();
  }, [diagram_text]);

  return (
    <div
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
      className={props.className}
      onClick={props.onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          props?.onClick?.(event);
        }
      }}
      id={container_id}
      data-testid={props.testId}
      ref={updateDiagramRef}
    />
  );
};
