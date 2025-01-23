import Image from "next/image";
import Link from "next/link";

import "./header.scss";

/**
 * Main app's Header
 * @returns {JSX.Element}
 */
const Header = () => (
  <header className="header">
    <Link href="/">
      <Image
        src="/icons/icon-48x48.png"
        alt="Masonry Grid logo"
        width={24}
        height={24}
        priority
      />
    </Link>
    <Link className="header__user-setting" href="/settings">
      User setting
    </Link>
  </header>
);

export default Header;
