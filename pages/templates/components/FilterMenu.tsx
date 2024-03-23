import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
} from "@chakra-ui/react";
import { TemplateTagId, TemplateTags } from "../data/_tags";

type FilterItem = {
  label: string;
  tags: (typeof TemplateTags)[number][];
};
const filterItems: FilterItem[] = [
  {
    label: "Products",
    tags: [
      {
        id: "connect",
        displayValue: "Connect",
      },
      {
        id: "contract",
        displayValue: "Contract",
      },
      {
        id: "engine",
        displayValue: "Engine",
      },
    ],
  },
  {
    label: "Use cases",
    tags: [
      {
        id: "nft",
        displayValue: "NFT",
      },
      {
        id: "loyalty",
        displayValue: "Loyalty",
      },
      {
        id: "gaming",
        displayValue: "Gaming",
      },
      {
        id: "phygital",
        displayValue: "Phygital",
      },
      {
        id: "dao",
        displayValue: "DAO",
      },
    ],
  },
  {
    label: "Platforms",
    tags: [
      {
        id: "typescript",
        displayValue: "TypeScript",
      },
      {
        id: "react",
        displayValue: "React",
      },
      {
        id: "unity",
        displayValue: "Unity",
      },
    ],
  },
];

type FilterProps = {
  queriedTags: TemplateTagId[];
};

export default function FilterMenu(props: FilterProps) {
  const { queriedTags } = props;
  return (
    <>
      {filterItems.map((item) => (
        <Accordion allowMultiple key={item.label}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {item.label} ({item.tags.length})
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} display="flex" flexDir="column">
              {item.tags.map((tag) => {
                const selected = queriedTags.includes(tag.id);
                return (
                  <Checkbox defaultChecked={selected} key={tag.id}>
                    {tag.displayValue}
                  </Checkbox>
                );
              })}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ))}
      <br />
    </>
  );
}
