import TabsHeader from "./TabsHeader";
import TabContent from "./TabContent";
import Preview from "./Preview";
import "./DatasetPreview.module.less";

const DatasetPreview = (): JSX.Element => {

  return (
    <div styleName="DatasetPreview">
      <TabsHeader  />
      <TabContent>
        <Preview />
      </TabContent>
    </div>
  );
};

export default DatasetPreview;
