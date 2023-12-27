import '@/styles/properties.css';
import { css, keyframes } from '@emotion/react';
import {
  ChevronRightIcon,
  PencilSquareIcon,
  PlusIcon,
} from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';
import { useGetContents } from '@/features/Content/api/getContents';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button/Button';
import { useContentStore } from '@/stores/contentStore';

export const LeftSidebar = () => {
  const { data } = useGetContents();
  const [menuState, setMenuState] = useState(Array(data?.length).fill(false));
  const { changeContent } = useContentStore();

  useEffect(() => {
    if (data) {
      changeContent(data[0].content ?? '');
    }
  }, [data]);

  const toggleMenu = (index: number, content?: string) => {
    const newMenuState = [...menuState];
    newMenuState[index] = !newMenuState[index];
    setMenuState(newMenuState);
    if (content) {
      changeContent(content);
    }
  };

  const handleAddClick = () => {};
  return (
    <div css={leftSidebarContainer}>
      {data &&
        data.map((list, index) => (
          <section css={sectionStyle}>
            <div
              css={titleStyle(menuState[index])}
              onClick={() => toggleMenu(index, list.content)}
            >
              <text>{list.title}</text>
              {list.items.length > 0 && (
                <ChevronRightIcon
                  width={28}
                  css={[arrowIconStyle, menuState[index] && animationIcon]}
                />
              )}
            </div>
            {list.items.length > 0 && (
              <ul css={[listStyle, menuState[index] ? listOpen : listClose]}>
                {list.items.map((item, itemIndex) => (
                  <li
                    css={listItem}
                    key={itemIndex}
                    onClick={() => changeContent(item.content)}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      <div css={updateList}>
        <Text placeHolder="Add content..." />
        <Button onClick={handleAddClick}>
          <PlusIcon width={24} css={iconStyle} />
        </Button>
        <Button onClick={handleAddClick}>
          <PencilSquareIcon width={24} css={iconStyle} />
        </Button>
      </div>
    </div>
  );
};

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
  width: 15rem;
  text-transform: capitalize;
  border-right: 1px solid var(--light-color);
  padding: 10px;
  height: calc(100vh - 20px);
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: var(--light-color);
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--secondary-color);
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--color);
  }
`;

const sectionStyle = css`
  cursor: pointer;
`;

const titleStyle = (isOpen: boolean) => css`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border-radius: 3px;
  ${isOpen && 'color: yellow !important'}
  &:hover {
    background-color: var(--light-color);
    transition: background-color 0.25s;
  }
`;
const iconStyle = css`
  padding: 0;
`;

const arrowIconStyle = css`
  animation: ${iconAnimationClose} 0.5s ease-in-out;
`;

const animationIcon = css`
  animation: ${iconAnimationOpen} 0.5s ease-in-out;
  transform: rotate(90deg);
`;

const listOpen = css`
  height: 100%;
  display: block;
`;

const listClose = css`
  height: 0;
  display: none;
`;

const listStyle = css`
  list-style: none;
  margin: 0px;
  padding: 0px;
  will-change: height;
  transition: height 644ms ease-in-out 0s;
`;

const listItem = css`
  padding: 5px 0 5px 20px;
  border-radius: 3px;
  transition: background-color 0.25s;
  &:hover {
    background-color: var(--light-color);
  }
`;

const updateList = css`
  margin: 10px 0;
  width: 100%;
`;
