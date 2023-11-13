import { Container, Flex, ListItem, UnorderedList } from "@chakra-ui/react";
import { LandingLayout } from "components/landing-pages/layout";
import { PageId } from "page-id";
import { Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";
import { getAbsoluteUrl } from "lib/vercel-utils";

const Privacy: ThirdwebNextPage = () => {
  return (
    <LandingLayout
      seo={{
        title: "thirdweb's Privacy Policy",
        description:
          "The most efficient way to build web3 apps for millions of users — with a robust infrastructure stack that scales as you grow. Learn more.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/thirdweb-pro.png`,
              width: 1200,
              height: 630,
              alt: "thirdweb Pro",
            },
          ],
        },
      }}
    >
      <Container
        maxW="container.page"
        as={Flex}
        flexDir="column"
        gap={{ base: "80px", md: "120px" }}
      >
        <PrivacyPolicy />
      </Container>
    </LandingLayout>
  );
};

const PrivacyPolicy = () => {
  return (
    <div tw="w-full h-full flex flex-col items-center">
      <Text size="label.2xl" color="white">
        <strong>Thirdweb Privacy Policy</strong>
      </Text>
      <Text marginTop="10" marginBottom="10">
        Effective: May 3, 2022
      </Text>
      <p>
        This Privacy Policy (“Policy”) describes how thirdweb, created by
        Non-Fungible Labs, Inc., (collectively, “thirdweb”, “we,” “our,” “us”)
        collects, uses, and discloses certain personal information obtained when
        you access, use or download our software development kits (“SDKs”),
        web-based development tools and downloadable software (collectively, the
        “Software”), visit our website (the “Site”), apply for our gas grants,
        or when you communicate with us in connection with our services. By
        accessing, using or downloading our Software, visiting our Site and/or
        using the features made available to you on the Site (the “Services”),
        you are agreeing to the terms of this Policy. If you provide the
        personal information of another individual, it means that you have
        informed him/her of the purpose for which we require his/her personal
        information and he/she has consented to the collection, use and
        disclosure of his/her personal data in accordance with this Policy.
      </p>

      <Text size="label.xl" color="white" marginTop="10" marginBottom="10">
        <strong>Information We Collect</strong>
      </Text>
      <p>
        We collect personal information directly from you when you use our
        Services, including when you access, use or download our Software, visit
        our Site, apply for gas grants or provide us with feedback. We
        automatically collect certain information about you and your computer,
        smartphone, or other such device when you use, access, download or
        interact with our Services. We may also collect information about you
        from other third parties, such as social media companies.
      </p>
      <p>
        Our developer community. We may collect the following categories of
        personal information when you directly provide it to us through our
        Services:
      </p>
      <UnorderedList>
        <ListItem>
          Technical information, such as your cryptocurrency wallet address. We
          will never ask you to share your private keys or wallet seed;
        </ListItem>
        <ListItem>Contact information such as your email address;</ListItem>
        <ListItem>
          Profile information such as your social media username; and
        </ListItem>
        <ListItem>
          Device information such as your browser, device, originating URL and
          referring domain.
        </ListItem>
      </UnorderedList>
      <p>
        Gas grant applicants. If you apply to our gas grant promotional program,
        we may collect additional personal information that you provide to us,
        including:
      </p>
      <UnorderedList>
        <ListItem>Identity information such as your name;</ListItem>
        <ListItem>
          Contact information such as your email address and phone number;
        </ListItem>
        <ListItem>Profile information such as your Twitter handle;</ListItem>
        <ListItem>
          Employment information such as your role and team size and your
          company name and website; and
        </ListItem>
        <ListItem>
          Transaction information such as your past wallet history.
        </ListItem>
      </UnorderedList>
      <p>
        Other personal information collected through use of the Services. We
        collect information automatically when you use the Services, including
        when you browse our Site. To the extent you use certain features of the
        Site, such as the “Feedback” feature, we will collect the personal
        information that you provide us, which may include your email address or
        social media username.
      </p>

      <p>
        Job applicants. When you submit a job application, we will collect your
        personal information. The categories of information we may collect
        include your full name, email address, phone number, resume, current and
        previous work history, and other information about you personally and
        your employment history.
      </p>
      <p>
        Server logs. Server logs automatically record information and details
        about your online interactions with us. For example, server logs may
        record information about your visit to our Site on a particular time and
        day and collect information such as your device ID and IP address.
      </p>
      <p>
        Cookies. We also use cookies on the Services. Cookies are small files
        that are stored on your device through the Site. A cookie allows the
        Services to recognize whether you have visited before and may store user
        preferences and other information. For example, cookies can be used to
        collect or store information about your use of the Services during your
        current session and over time (including the pages you view and the
        files you download), your mobile device’s operating system, your IP
        address, and your general geographic location.
      </p>
      <p>
        Pixel tags. A pixel tag (also known as a web beacon, clear graphics
        interchange format (GIF), pixel, or tag) is an image or a small string
        of code that may be placed in an advertisement or email. It allows
        companies to set or read cookies or transfer information to their
        servers when you load a webpage or interact with online content. For
        example, our service providers may use pixel tags to determine whether
        you have interacted with a specific part of our Site.
      </p>
      <p>
        Third-party plugins. Our Services may include plugins from other
        companies, including social media companies. These plugins may collect
        information, such as information about the pages you visit, and share it
        with the company that created the plugin even if you do not click on the
        plugin. These third-party plugins are governed by the privacy policies
        and terms of the companies that created them.
      </p>
      <p>
        Third-party online tracking. We also may partner with certain third
        parties to collect, analyze, and use some of the personal and other
        information described in this section. For example, we may allow third
        parties to set pixels and mobile advertising IDs through the Site. This
        information may be used for a variety of purposes, including Site
        analytics, as discussed below (see the section entitled “With Whom and
        Why We Share Your Information”).
      </p>
      <p>
        Aggregated and deidentified information. From time to time, we may also
        aggregate or de- identify information about your use of our Services,
        such as the pages you visit or your transactions, and share that
        information with third parties. Such aggregated information will not
        identify you personally.
      </p>

      <Text size="label.xl" color="white" marginTop="10" marginBottom="10">
        How We Use and Process Your Information
      </Text>
      <p>
        The primary purpose for which we collect information is to provide you
        with our Services so that by use of our Software, you can create
        applications and tokens (“Code”). Other purposes for which we use your
        information include to:
      </p>
      <UnorderedList>
        <ListItem>
          Respond to your inquiries and provide you with technical support;
        </ListItem>
        <ListItem>Evaluate your gas grant applications and your Code;</ListItem>
        <ListItem>
          Communicate with you through our social media plugins or our Site;
        </ListItem>
        <ListItem>
          Improve our Services, optimize our platform and your user experience;
        </ListItem>
        <ListItem>
          Advertise, merchandise and publicize your gas grant with our
          community;
        </ListItem>
        <ListItem>
          Evaluate employment applications and contact you regarding potential
          employment;
        </ListItem>
        <ListItem>
          Comply with legal and/or regulatory requirements; and
        </ListItem>
        <ListItem>Manage our business.</ListItem>
      </UnorderedList>

      <Text size="label.xl" color="white" marginTop="10" marginBottom="10">
        With Whom and Why We Share Your Information
      </Text>
      <p>
        We share your information with other parties for a variety of purposes
        related to the operation of our business, as described below.
      </p>
      <p>
        Third-party service providers. Thirdweb also uses third-party service
        providers that perform Services on our behalf, including, web-hosting
        companies, IT infrastructure and support, customer communication,
        marketing, and other similar services. These service providers may
        collect and/or use your information, including information that
        identifies you personally, to assist us in achieving the purposes
        discussed above. Our service providers are not allowed to use
        information about our donors for their own purposes and are
        contractually obligated to maintain confidentiality.
      </p>
      <p>
        Analytics. We partner with certain third parties to obtain the
        automatically collected information discussed above and to engage in
        analysis, auditing, research, and reporting. These third parties may use
        server logs or pixel tags, and they may set and access cookies on your
        computer or other device.
      </p>
      <p>
        Legal purposes. We also may use or share your information with third
        parties, including government agencies or other regulatory bodies and
        law enforcement officials, when we believe, in our sole discretion, that
        doing so is necessary:
      </p>
      <UnorderedList>
        <ListItem>
          To comply with applicable law, a court order, subpoena, or other legal
          process or otherwise cooperate with appropriate law enforcement or
          regulatory investigations;
        </ListItem>
        <ListItem>
          To investigate, prevent, or take action regarding illegal activities,
          suspected fraud, violations of our terms and conditions, or situations
          involving threats to our property or the property or physical safety
          of any person or third party;
        </ListItem>
        <ListItem>
          To establish, protect, or exercise our legal rights or defend against
          legal claims; or
        </ListItem>
        <ListItem>
          To facilitate the financing, securitization, insuring, sale,
          assignment, bankruptcy, or other disposal of all or part of our
          business or assets.
        </ListItem>
      </UnorderedList>

      <Text size="label.xl" color="white" marginTop="10" marginBottom="10">
        Your Choices
      </Text>
      <p>
        If you want to learn more about the personal information that thirdweb
        has about you, or you would like to update, change, or delete that
        information, please contact us by email at{" "}
        <a href="mailto:privacy@thirdweb.com">privacy@thirdweb.com</a>. We will
        respond to your request as soon as reasonably possible and no longer
        than what is permitted under applicable law.
      </p>

      <Text size="label.xl" color="white" marginTop="10" marginBottom="10">
        External Links
      </Text>
      <p>
        The Site may contain links to third-party websites or services. If you
        use these links, you will leave the Site. We have not reviewed these
        third-party sites and do not control and are not responsible for any of
        these sites, their content, or their privacy policy. Thus, we do not
        endorse or make any representations about them, or any information,
        software, or other products or materials found there, or any results
        that may be obtained from using them. If you decide to access any of the
        third-party sites listed on our Site, you do so at your own risk.
      </p>

      <Text size="label.xl" color="white" marginTop="10" marginBottom="10">
        Data Security
      </Text>
      <p>
        We employ physical, technical, and administrative procedures to
        safeguard the personal information we collect online. However, no
        website is 100% secure, and we cannot ensure or warrant the security of
        any information you transmit to the Services or to us. You transmit such
        information at your own risk.
      </p>

      <Text size="label.xl" color="white" marginTop="10" marginBottom="10">
        Data Retention
      </Text>
      <p>
        We retain personal information about you necessary to fulfill the
        purpose for which that information was collected, as specifically
        limited by the policies outlined above, or as required or permitted by
        law. We do not retain personal information longer than is necessary for
        us to achieve the purposes for which we collected it. When we destroy
        your personal information, we do so in a way that prevents that
        information from being restored or reconstructed.
      </p>

      <Text size="label.xl" color="white" marginTop="10" marginBottom="10">
        International Transfers
      </Text>
      <p>
        The information that we collect through or in connection with the Site
        is transferred to and processed in the United States for the purposes
        described above. We may also subcontract the processing of your data to,
        or otherwise share your data with, affiliates or third parties in the
        United States or countries other than your country of residence. The
        data-protection laws in these countries may be different from, and less
        stringent than, those in your country of residence. By using the
        Services or by providing any personal or other information to us, you
        expressly consent to such transfer and processing.
      </p>

      <Text size="label.xl" color="white" marginTop="10" marginBottom="10">
        Children
      </Text>
      <p>
        Our services are directed at individuals over the age of 13 and is not
        directed at children under the age of 13. We do not knowingly collect
        personally identifiable information from children under the age of 13.
      </p>

      <Text size="label.xl" color="white" marginTop="10" marginBottom="10">
        Updates to this Policy
      </Text>
      <p>
        Thirdweb reserves the right to modify its Policy at any time, for any
        reason. Thirdweb will post all such changes on the Site. We encourage
        you to review this page periodically to review the current Policy in
        effect.
      </p>

      <Text size="label.xl" color="white" marginTop="10" marginBottom="10">
        How to Contact Us
      </Text>
      <p>
        Should you have any questions or concerns about this Policy, you can
        contact us by, sending us at{" "}
        <a href="mailto:privacy@thirdweb.com">privacy@thirdweb.com</a> or at:
        Non-Fungible Labs, Inc. 2 Marina Blvd, B300N, San Francisco, CA 94123
      </p>
    </div>
  );
};

Privacy.pageId = PageId.Privacy;

export default Privacy;
