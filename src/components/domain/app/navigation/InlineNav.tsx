import React from "react";
import css from "./inline-nav.module.scss";
import IconBack from "assets/icons/arrow_left.svg";
import { HorizontalScroller } from "components/common/horizontal-scroller";
import { Link } from "components/common/link";
import IconSwirl from "assets/icons/swirl.svg";
import { useRouter } from "next/router";

const Links = (props: any) => {
  const router = useRouter();
  const pathname = router.pathname;
  const normalizedPathname =
    pathname[pathname.length - 1] === "/"
      ? pathname.slice(0, pathname.length - 1)
      : pathname;
  const toRemove = normalizedPathname.split("/").pop();
  const nextPathname = normalizedPathname.replace(toRemove, "");

  return (
    <HorizontalScroller>
      <div className={css["inline-nav"]}>
        {props.nested ? (
          <Link
            to={nextPathname}
            className={`${css["icon"]} icon ${css["nested"]}`}
          >
            <IconBack />
          </Link>
        ) : (
          <IconSwirl className={`${css["icon"]} icon`} />
        )}

        {props.links.map((link: any, index: number) => {
          let className = css["nav-item"];

          // If there's only one item, we can assume it's selected
          const selected = props.links.length === 1 || link.useIsActive(); // link.to === normalizedPathname || props.links.length === 1

          if (selected) className += ` ${css["selected"]}`;

          // Can optionally pass in a component as a title to dynamically resolve the link text
          const title = link.Title ? link.Title() : link.title;

          const body = link.to ? (
            <Link className={css["title"]} to={link.to} allowDrag>
              {title}
            </Link>
          ) : (
            <p className={css["title"]}>{title}</p>
          );

          return (
            <div className={className} key={link.to || index}>
              {body}
            </div>
          );
        })}
      </div>
    </HorizontalScroller>
  );
};

// Testing custom data resolvers for dynamic routes
const useSession = (id: string | null) => {
  const sessions = [{ id: "test", title: "Test session" }];

  return sessions.find((session) => session.id === id);
};

export const InlineNav = React.memo((props: any) => {
  return (
    <div id="inline-nav" className={`${css["container"]} section`}>
      <div className="content">
        <Links
          path="*"
          links={[
            {
              title: "Home",
              to: "/app",
              useIsActive: () => {
                return false;
              },
            },
            {
              title: "Dashboard",
              to: "/app/dashboard",
              useIsActive: () => {
                return false;
              },
            },
            {
              title: "Conference",
              to: "/app/conference",
              useIsActive: () => {
                return false;
              },
            },
            {
              title: "Schedule",
              to: "/app/schedule",
              useIsActive: () => {
                return false;
              },
            },
            {
              title: "Updates",
              to: "/app/updates",
              useIsActive: () => {
                return false;
              },
            },
            {
              title: "Speakers",
              to: "/app/speakers",
              useIsActive: () => {
                return false;
              },
            },
            {
              title: "Venue",
              to: "/app/venue",
              useIsActive: () => {
                return false;
              },
            },
            {
              title: "Side Events",
              to: "/app/side-events",
              useIsActive: () => {
                return false;
              },
            },
            {
              title: "Quests",
              to: "/app/quests",
              useIsActive: () => {
                return false;
              },
            },
            {
              title: "Livestreaming",
              to: "/app/livestreaming",
              useIsActive: () => {
                return false;
              },
            },
            {
              title: "Archive",
              to: "/app/archive",
              useIsActive: () => {
                return false;
                // return useMatch('/app/archive/*')
              },
            },
          ]}
          {...props}
        />

        <Links
          nested
          path="/settings"
          links={[
            {
              title: "Settings",
            },
          ]}
        />

        <Links
          nested
          path="/settings/:page"
          links={[
            {
              title: "Settings",
            },
          ]}
        />

        <Links
          nested
          path="/notifications"
          links={[
            {
              title: "Notifications",
            },
          ]}
        />

        <Links
          nested
          path="/dashboard"
          links={[
            {
              title: "Dashboard",
            },
          ]}
        />

        <Links
          nested
          path="/speakers"
          links={[
            {
              title: "Speakers",
            },
          ]}
        />

        <Links
          nested
          path="/speakers/:speaker"
          links={[
            {
              title: "Speaker",
            },
          ]}
        />

        <Links
          nested
          path="/schedule"
          links={[
            {
              title: "Schedule",
            },
          ]}
        />

        <Links
          nested
          path="/info"
          links={[
            {
              title: "Information",
            },
          ]}
        />

        <Links
          nested
          path="/venue"
          links={[
            {
              title: "Venue",
            },
          ]}
        />

        <Links
          nested
          path="/venue/:room"
          links={[
            {
              title: "Room",
            },
          ]}
        />

        <Links
          nested
          path="/side-events"
          links={[
            {
              title: "Side Events",
            },
          ]}
        />

        <Links
          nested
          path="/schedule/:session"
          links={[
            {
              Title: () => {
                const match = false; // useMatch('/app/schedule/:session')

                const session = useSession(null); // match ? match.session : null)

                return session ? session.title : "Session";
              },
            },
          ]}
        />
      </div>
    </div>
  );
});

InlineNav.displayName = "InlineNav";
