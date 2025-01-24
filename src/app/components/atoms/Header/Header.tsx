"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const StyledHeader = styled.header`
  position: sticky;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 8px 16px;
  background-color: rgb(31, 31, 31);
`;
const UserSetting = styled(Link)`
  font-weight: 600;
  color: gray;
`;

/**
 * Main app's Header
 * @returns {JSX.Element}
 */
const Header = () => (
  <StyledHeader>
    <Link href="/">
      <Image
        src="/icons/icon-48x48.png"
        alt="Masonry Grid logo"
        width={24}
        height={24}
        priority
      />
    </Link>
    <UserSetting href="/settings">User setting</UserSetting>
  </StyledHeader>
);

export default Header;
