import React from "react";
import css from "./footer.module.scss";
import IconArrowUpward from "assets/icons/arrow_upward.svg";
import IconGithub from "assets/icons/github.svg";
import IconTwitter from "assets/icons/twitter.svg";
import IconYoutube from "assets/icons/youtube.svg";
import ImageLogo from "assets/images/test-asset.svg";
import ImageEF from "assets/images/ef-logo.svg";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { Link } from "components/common/link";
import { Link as LinkType } from "types/Link";
import { Newsletter } from "components/common/newsletter";
import { usePageContext } from "context/page-context";
import { Share } from "components/common/share";
import {
  COPYRIGHT_NOTICE,
  EMAIL_DEVCON,
  EMAIL_SPONSORSHIP,
  LINK_ETHEREUM_FOUNDATION,
  TITLE,
} from "utils/constants";
import { ArchiveFooter } from "./ArchiveFooter";

type SocialMediaProps = {
  onShare: () => void;
  url?: string;
  className?: string;
};

export const SocialMedia = ({
  onShare,
  url,
  className: extraClassName,
}: SocialMediaProps) => {
  let className = css["social-media"];

  if (extraClassName) className += ` ${extraClassName}`;

  return (
    <div className={className}>
      <Link to="https://twitter.com/efdevcon">
        <IconTwitter style={{ cursor: "pointer" }} />
      </Link>
      <Link to="https://github.com/efdevcon">
        <IconGithub style={{ cursor: "pointer" }} />
      </Link>
      <Link to="https://www.youtube.com/c/EthereumFoundation/search?query=devcon">
        <IconYoutube style={{ cursor: "pointer" }} />
      </Link>
      <Share url={url} onShare={onShare} />
    </div>
  );
};

export const Footer = () => {
  const context = usePageContext();
  const footerData = context?.navigation.footer;
  const router = useRouter();
  const intl = useTranslations();
  const lang = router.locale;

  // Temporary for demo purposes
  if (router.pathname.startsWith("/archive")) return <ArchiveFooter />;

  return (
    <footer className={`footer ${css["container"]}`}>
      <div className={css["top-section"]}>
        <div className={css["content"]}>
          <div className={css["col-1"]}>
            <Link to={`/${lang}/`}>
              <ImageLogo />
            </Link>
          </div>

          <div className={css["col-2"]}>
            {footerData?.highlights.map((link: LinkType, index: number) => {
              return (
                <h2 key={index} className="spaced">
                  <Link to={link.url} className="plain hover-underline">
                    {link.title}
                  </Link>
                </h2>
              );
            })}

            <SocialMedia
              onShare={() => {
                return;
              }}
            />
          </div>

          <div className={css["col-3"]}>
            <ul className={css["list"]}>
              {footerData?.left.map((link: LinkType, index: number) => {
                return (
                  <li className="semi-bold" key={index}>
                    <Link to={link.url} className="plain hover-underline">
                      {link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={css["col-4"]}>
            <ul className={css["list"]}>
              {footerData?.right.map((link: LinkType, index: number) => {
                return (
                  <li className="semi-bold" key={index}>
                    <Link to={link.url} className="plain hover-underline">
                      {link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={css["col-5"]}>
            <div className={css["contact"]}>
              <p className="semi-bold">{intl("getintouch")}</p>
              <p className={css["email-1"]}>{EMAIL_DEVCON}</p>

              <p className="semi-bold">{intl("partnerwithus")}</p>
              <p className={css["email-2"]}>{EMAIL_SPONSORSHIP}</p>

              {/* Visible on some breakpoints, but not all - moves to col-7 on mobile */}
              <div className={css["newsletter"]}>
                <Newsletter id="footer_newsletter_email" />
              </div>
            </div>
          </div>

          <div className={css["col-6"]}>
            <div className={css["scroll-up"]}>
              <IconArrowUpward
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

          {/* Only visible on mobile */}
          <div className={css["col-7"]}>
            <Newsletter id="footer_newsletter_email_mobile" />
          </div>
        </div>
      </div>

      <div className={css["bottom-section"]}>
        <div className={css["content"]}>
          <div className={css["col-1"]}>{COPYRIGHT_NOTICE}</div>

          <div className={css["col-2"]}>
            {footerData?.bottom.map((link: LinkType, index: number) => {
              return (
                <p className="semi-bold" key={index}>
                  <Link
                    to={link.url}
                    external={link.type === "url"}
                    className="plain hover-underline"
                  >
                    {link.title}
                  </Link>
                </p>
              );
            })}
          </div>

          <div className={css["col-3"]}>
            <Link
              external
              className={css["small-logo"]}
              to={LINK_ETHEREUM_FOUNDATION}
            >
              <ImageEF />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
