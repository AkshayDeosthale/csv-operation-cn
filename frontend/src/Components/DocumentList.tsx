import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import DocumentDetails from "./DocumentDetails";
import { DocumentStructure } from "../App";

type Props = {
  documentList: DocumentStructure[];
};

const DocumentList = ({ documentList }: Props) => {
  const items: CollapseProps["items"] = documentList.map((doc, index) => {
    return {
      key: index,
      label: doc.name,
      children: <DocumentDetails data={doc.data} />,
    };
  });

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return <Collapse items={items} onChange={onChange} />;
};

export default DocumentList;
