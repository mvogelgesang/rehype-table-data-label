import { visit } from "unist-util-visit";

export default function remarkTableDataLabel() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "table") {
        let headers = [];

        // Find headers
        visit(node, "element", (node) => {
          if (node.tagName === "thead") {
            visit(node, "element", (node) => {
              if (node.tagName === "th") {
                headers.push(node.children[0].value);
              }
            });
          }
        });

        // Add data-labels to td elements
        visit(node, "element", (node) => {
          if (node.tagName === "tbody") {
            visit(node, "element", (node, index) => {
              if (node.tagName === "tr") {
                let tdIndex = 0;
                visit(node, "element", (node, index) => {
                  if (node.tagName === "td") {
                    node.properties["data-label"] = headers[tdIndex];
                    tdIndex++;
                  }
                });
              }
            });
          }
        });
      }
    });
  };
}
