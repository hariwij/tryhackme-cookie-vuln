_Note -_ This room was created as a part of year 01 semester 01 bug-bounty assignment for Cyber Security.

# My Journey of Hunting Bugs

First to start with bug-bounty I have to select bug-bounty providing platform like (HackeOne, BugCroud, Open Bug Bounty, etc.). Amoung them I have selected [HackerOne](https://www.hackerone.com/) as my bug-bounty platform. Then amoung the availible programs I have selected this website which enables its users to keep, mange and share their notes and documents.

To find bugs, First I used registered as a normal user and started to use it to understand the functionality of the website. Then I monitored the network traffic using browser dev tools and burp-suite. Throughout this I found followings,

-   Their main website was using [Next.js](https://nextjs.org/).
-   Main website was designed using [prismic.io](https://prismic.io/). (prismic.io is a headless CMS that enables users to create content(websites / web pages) with an easy to use interface.)

And when it comes to the web applcation, I found followings,

-   The web application was using [React.js](https://reactjs.org/) as the front-end framework.
-   Uses GraphQL and a Web Worker to trancieve data between front-end and back-end.
-   They have few cookies which seems to be added when developing or testing the application. And which not necessary for the production application.
-   While some cookies directly store the user information. (like `user account type`)

After finding these I noted them down and continued searching the wesite using tools like `nmap`, `nslookup`, `whatweb`, `dimitry` etc. From these scans I didn't found any interseting details.

-   No open ports except 80 and 443.
-   They use google cloud platform for hosting and for DNS.

With the information that I have found so far, I narrowed down the scope of search to cookies. And started to find vulnerblities of the cookie configuration of my targeted website.

# CWE-784: Reliance on Cookies without Validation and Integrity Checking in a Security Decision

## Introduction

CWE-784, officially recognized as "Reliance on Cookies without Validation and Integrity Checking in a Security Decision," is a crucial entry in the Common Weakness Enumeration (CWE) framework that focuses on security vulnerabilities frequently encountered in web applications and systems. This specific weakness pertains to the overreliance on cookies as a means of storing and transmitting sensitive information without implementing proper validation and integrity checks.

In essence, it's an issue that can potentially compromise the security of web applications. When an application lacks mechanisms to verify the authenticity and integrity of the data contained within cookies, it becomes susceptible to a range of security threats. These threats can include session hijacking, where attackers can impersonate legitimate users, tampering with the data stored in cookies to manipulate application behavior, or even escalating privileges to gain unauthorized access to resources. Therefore, to mitigate the risks associated with CWE-784, developers must ensure that cookies are utilized securely by implementing rigorous validation processes and incorporating integrity checks to guarantee the accuracy and trustworthiness of the data stored within these tokens. By addressing this specific weakness, developers can enhance the overall security posture of their web applications, safeguard user data, and fortify their systems against malicious exploits that may exploit these vulnerabilities.

## Creating a Exploitable replica of the website

To create the replica of the website I choosed [Next.js](https://nextjs.org/), Because I'm very familiar with it.

### Creating the front-end

Since this is developing for learning purpose, I care about the UI.
So I only created a single page and it have following functionalities,

-   User can login to the system.
-   User can logout from the system.
-   User see his/her account information.
-   User can request to access content. (The content is not available for all users. Only for `paid` users.)

### Creating the back-end

I have developed following API routes to create MVP to replicate the vulnerbilty.

-   `/api/signin` [POST] - To login to the system.
-   `/api/signin` [GET] - To get the user information, if the user is logged in.
-   `/api/signout` [GET] - To logout from the system.
-   `/api/paid` [GET] - To get the restricted content. (Only for availible for `paid` users.)

**Behaviors of the API routes**

-   **`/api/signin` [POST]**

          If the `email` and `password` is correct, it will set the cookie for the user.

    -   If the email and password is not correct, it will return `401` status code with a error message.
    -   If the email and password is correct, it will return `200` status code with the user information.

-   **`/api/signin` [GET]**

          If the user is logged in, it will return the user information.

    -   If the user is not logged in, or cookie is invalid, it will return `401` status code with a error message.
    -   If the user is logged in, and cookie is valid it will return `200` status code with the user information.

-   **`/api/signout` [GET]**

          If the user is logged in, it will clear the cookie and return `200` status code.

-   **`/api/paid` [GET]**

          If the user is logged in, and the user is `paid` user, it will return the restricted content.

    -   If the user is not logged in, or cookie is invalid, it will return `401` status code with a error message.
    -   If the user is logged in, and cookie is valid, but the user is not `paid` user, it will return `401` status code with a error message.
    -   If the user is logged in, and cookie is valid, and the user is `paid` user, it will return `200` status code with the restricted content.

### Exploiting the vulnerbilty

To exploit the vulnerbilty, You can follow the following steps.

1. Go to the website and login to the system using the following credentials.

    - Email: `jhon@gmail.com`
    - Password: `123456`

2. After login, you will see the user information in the web page. And your account type will be `free`.
3. Now click on the `Load Content` button. It will show you a error message saying `Unauthorized`.

4. Now open the browser dev tools and go to the `Application` tab (I'm using Google Chrome). Then go to the `Cookies` section. You will see a two cookies.

    1. Authorization
    2. AccountType

5. Now change the `AccountType` to `paid` and click on the `Load Content` button. Now you will see a popup `You are a paid user. You have access to premium content`.


Sir, I found this on the website that i have selected to do bugbounty on. 
They are saving the user account type in a cookie. Still i could not gain a advantage by playing with the cookie,
But I have created a replica of the website and I have exploited the vulnerbilty. Is this ok for the tryhackme room that we need to submit for the assignment?
