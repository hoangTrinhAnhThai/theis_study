import { css, keyframes } from "@emotion/react"
import "@/styles/properties.css";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useGetContents } from "@/features/Content/api/getContents";

export const LeftSidebar = () => {
  const {data} = useGetContents();
  const [menuState, setMenuState] = useState(Array(data?.length).fill(false));

  const toggleMenu = (index: number) => {
    const newMenuState = [...menuState];
    newMenuState[index] = !newMenuState[index];
    setMenuState(newMenuState);
  }
  return (
    <div css={leftSidebarContainer}>
      { data && data.map((content, index) => (
        <section css={sectionStyle}>
          <div css={titleStyle(menuState[index])} onClick={() => toggleMenu(index)}>
            <text>{content.title}</text>
            <ChevronRightIcon width={28} css={[iconStyle, menuState[index] && animationIcon]}/>
          </div>
            { content.items && (
              <ul css={[listStyle, menuState[index]? listOpen : listClose]} >
                {content.items.map((item, itemIndex) => (
                  <li css={listItem} key={itemIndex}>{item.title}</li>
                  )
                )}
              </ul>
            )}
        </section>
      ))}
    </div>
  )
}

const iconAnimationOpen = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(90deg);
  }
`;

const iconAnimationClose = keyframes`
  from {
    transform: rotate(90deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const leftSidebarContainer = css`
  margin: 50px;
  width: 200px;
  text-transform: capitalize;
`;

const sectionStyle = css`
  cursor: pointer;
`;

const titleStyle = (isOpen: boolean) => css`
  display: flex;
  justify-content: space-between;
  padding: 3px 10px 0;
  border-radius: 3px;
  ${isOpen && 'color: yellow !important'}
  &:hover {
    background-color: var(--light-color);
    transition: background-color 0.25s;
  }
`;
const iconStyle = css`
  animation: ${iconAnimationClose} 0.5s ease-in-out;
`;

const animationIcon = css`
  animation: ${iconAnimationOpen} 0.5s ease-in-out;
  transform: rotate(90deg);
`

const listOpen = css`
  height: 100%;
  visibility: visible;
  transition: height 5s ease-in-out 0s;
`

const listClose = css`
  height: 0;
  visibility: hidden;
  transition: height 5s ease-in-out 0s;
`

const listStyle = css`
  list-style: none;
  margin: 5px;
  padding: 0 5px;
  transition: height 0.5s;
`;

const listItem = css`
  padding: 3px 10px;
  border-radius: 3px;
  transition: background-color 0.25s;
  &:hover {
    background-color: var(--light-color);
  }
`;


