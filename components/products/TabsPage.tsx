import React, { useEffect, useRef, useState } from 'react';
import TabComponent from './TabComponent';
import IframeResizer from 'iframe-resizer-react';
//import MessageData from './message-data'

interface TabPageProps{
  loading: boolean;
  product: any;
  etilize: any;
}

interface TechnicalSpecification {
  headerName: string;
  attributeName: string;
  attributeValue: string;
}

const TabsPage: React.FC<TabPageProps> = ({product, loading, etilize}) => {

  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<string>('900px');
  const [activeTab, setActiveTab] = useState<string>('tab1');
  const [attributeContent, setAttributeContent] = useState('');
  const [technicalContent, setTechnicalContent] = useState('');
  const [genralInfo,  setGeneralInfo] = useState('');
  const [messageData, setMessageData] = useState(undefined);
  const [url, setUrl] = useState('');
  const groupedSpecifications: Record<string, TechnicalSpecification[]> = {};

 
  const attributeValue = (product?.technicalSpecifications?.[0]?.attributeValue || '') || '';

  const attributeDisplay = (product?.technicalSpecifications?.[0]?.attributeDisplay || '') || '';

  const technicalSpecifications = product?.technicalSpecifications || '';
  const groupedEtilizeSpecifications = etilize?.datasheet?.attributeGroup || [];
  const prodDescr = etilize?.datasheet?.attributeGroup
          .find((group: { name: string; }) => group.name === "General Information")
          ?.attribute
          .find((attr: { name: string; }) => attr.name === "Marketing Information")
          ?.content;

// Group the attributes by headerName
// Group the attributes by headerName
if (Array.isArray(product?.technicalSpecifications)) {
  product?.technicalSpecifications.forEach((spec: TechnicalSpecification) => {
    if (!groupedSpecifications[spec.headerName]) {
      groupedSpecifications[spec.headerName] = [];
    }
    groupedSpecifications[spec.headerName].push(spec);
  });
} else {
  console.error("technicalSpecifications is not an array.");
}


  const onLoad = () => {
    if (ref.current?.contentWindow) {
      setHeight(`${ref.current.contentWindow.document.body.scrollHeight}px`);
    }
  };
  
 

  const onResized = (data: React.SetStateAction<undefined>) => setMessageData(data)

  const onMessage = (data: React.SetStateAction<undefined>) => {
    setMessageData(data)
    //ref.current.sendMessage('Hello back from parent page')
  }


  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // Extract URL from attributeDisplay javascript:window.open
    const attributeValue = product?.technicalSpecifications[0]?.attributeValue || '';
    const urlMatch = attributeValue.match(/window.open\('([^']+)'/);
    
    if (urlMatch && urlMatch[1]) {
      const url = urlMatch[1];
      setAttributeContent(url)
      
    }else{
     // const url = attributeValueUrl[1];
      //setAttributeContent(url)
    }

}, [product?.technicalSpecifications]);

useEffect(() => {
  onLoad();

  window.addEventListener('resize', onLoad);
  return () => {
    window.removeEventListener('resize', onLoad);
  };
}, []);


useEffect(() => {
  if (Array.isArray(technicalSpecifications)) {
    technicalSpecifications.forEach((spec) => {
      if (spec.attributeValue.includes('window.open')) {
        const urlMatch = spec.attributeValue.match(/window\.open\('([^']+)'/);
        if (urlMatch && urlMatch[1]) {
          setUrl(urlMatch[1]);
        }
        setGeneralInfo(spec.attributeValue);
      }
    });
  }
}, [technicalSpecifications]);


useEffect(() => {
  const iframeDocument = ref.current?.contentDocument;
  if (iframeDocument) {
    const editableElement = iframeDocument.querySelector('.editable');
    if (editableElement) {
      //setGeneralInfo(editableElement.innerHTML);
    }
  }
}, [url]);

  return (
    <div className="mt-5 mb-8">
      
      <TabComponent 
        activeTab={activeTab} 
        handleTabChange={handleTabChange} 
      />
  
      {activeTab === 'tab1' && 
      <div className="tab-content pt-5">
        <div className="attributeName text-[14px]">
        <span dangerouslySetInnerHTML={{ __html: prodDescr }} />
        </div>
        
        </div>}
      {activeTab === 'tab2' && 
      <div className="tab-content lg:grid lg:grid-cols-2 lg:gap-5">
       
          
       {groupedEtilizeSpecifications.map((group: any, index: number) => (
          group.name.toLowerCase() !== "warranty" && ( // Condition to skip "warranty" group
            <div key={index} className="group informationDetails">

              {/* Display the group name (e.g., "Marketing Information") */}
              <div className="bg-gray-200 p-3 font-bold">{group.name}</div>

              {/* Loop through the attributes within the group and display each attribute name and content */}
              {group.attribute.map((spec: any, specIndex: number) => (
                <div className="informationDetail mb-0 p-3 w-full flex lg:flex-row flex-col gap-5" key={specIndex}>
                  {/* Display attribute name */}
                  <div className="lg:w-[300px] text-[14px]">{spec.name}</div>
                  <div>
                    <span className="text-[14px]" dangerouslySetInnerHTML={{ __html: spec.content }} />
                  </div>
                </div>
              ))}
            </div>
          )
        ))}
      

      </div>}
      {activeTab === 'tab3' && 
      <div className="tab-content frameCover h-[100vh] pt-5 text-[12px]">
        
         <iframe src={url} width="100%"  id="Iframe"></iframe> 
                
        
      </div>}
      {activeTab === 'tab4' && 
      <div className="tab-content pt-5 additionalDetails">
      <div className="w-full">
      {product.warrantyInformation.map((info: string, index: number) => (
          <span key={index} className="mr-2">
            {info}
            {index < product.warrantyInformation.length - 1 && ','}
          </span>
        ))}
      </div>
      <div className="w-full weightInffo">
        <div className="infoTitle p-2 font-semiBold mt-5 mb-5">Additional Information</div>
        <div className="proInfo w-full text-[14px] flex flex-col lg:flex-row md:flex-row gap-5"><div className="ispace">Height :</div> {product?.additionalInformation?.height}</div>
        <div className="proInfo w-full text-[14px] flex flex-col lg:flex-row md:flex-row gap-5"><div className="ispace">Width :</div> {product?.additionalInformation?.width}</div>
        <div className="proInfo w-full text-[14px] flex flex-col lg:flex-row md:flex-row gap-5"><div className="ispace">Length :</div> {product?.additionalInformation?.length}</div>
        <div className="proInfo w-full text-[14px] flex flex-col lg:flex-row md:flex-row gap-5"><div className="ispace">Net Weight :</div> {product?.additionalInformation?.netWeight}</div>

        {groupedEtilizeSpecifications.map((group: any, index: number) => (
          group.name.toLowerCase() === "warranty" && ( // Condition to skip "warranty" group
            <div key={index} className="mt-3">

              {/* Display the group name (e.g., "Marketing Information") */}
              <div className="bg-gray-200 p-2 font-bold">{group.name}</div>

              {/* Loop through the attributes within the group and display each attribute name and content */}
              {group.attribute.map((spec: any, specIndex: number) => (
                <div className="informationDetail mb-0 p-3 w-full flex lg:flex-row flex-col gap-5" key={specIndex}>
                  {/* Display attribute name */}
                  <div className="lg:w-[300px] text-[14px]">{spec.name}</div>
                  <div>
                    <span className="text-[14px]" dangerouslySetInnerHTML={{ __html: spec.content }} />
                  </div>
                </div>
              ))}
            </div>
          )
        ))}

        
        
        </div>
      </div>}
    </div>
  );
};

export default TabsPage;