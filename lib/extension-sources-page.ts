// Content of community.vantiq.com/devcenter/extension-sources/, copied as it is
// on the live page (read 2026-09-24): section order, wording (including the live
// page's own typos) and link targets. The Extension Sources page
// (app/developer-center/extension-sources) renders this and nothing else.

export type Inline = string | { href: string; text: string };

export type Block =
  | { kind: "p"; parts: Inline[] }
  | { kind: "ul"; items: string[] }
  | { kind: "img"; src: string; alt: string; width: number; height: number };

export interface ExtensionSection {
  id: string;
  /** Section title as the live page's left-hand list prints it. */
  title: string;
  /** The bold line that opens the section body on the live page. */
  subtitle: string;
  blocks: Block[];
}

export const EXTENSION_SOURCES_INTRO =
  "Welcome to the VANTIQ Developer Portal. This is where you can find all technical resources for Vantiq developers.";

const GH = "https://github.com/Vantiq/vantiq-extension-sources";

const p = (...parts: Inline[]): Block => ({ kind: "p", parts });
const gh = (path: string): Inline => ({ href: `${GH}/tree/master/${path}`, text: `${GH}/tree/master/${path}` });

export const EXTENSION_SOURCES_SECTIONS: ExtensionSection[] = [
  {
    id: "enterprise-connectors-overview",
    title: "Enterprise Connectors (Overview)",
    subtitle: "Enterprise Connectors Overview",
    blocks: [
      p("Enterprise Connectors are used to allow VANTIQ to communicate with various other systems. Supported operations include"),
      {
        kind: "ul",
        items: [
          "sending a message to the connector (or, more precisely, via the connector to the connected system), having the connector send a message to VANTIQ, and",
          "querying the connector (or, more precisely, the system being connected).",
          "It is important to understand that the interpretation of these operations is determined completely by the connector designer/developer.",
        ],
      },
      p("For example, when sending a message to an enterprise connector, it might be the case that depending upon some parameter in the message, the connector might save the data, invoke some operation, or perform some other action that is appropriate for the data system that connector represents."),
      p("There are a number of prebuilt Enterprise Connectors and there is also an Enterprise Connector SDK that allows you to create your own custom Enterprise Connectors. The SDK and prebuilt enterprise connectors are all open source and each has individual open source licensing which is dependent on the underlying libraries that it integrates with and makes us of."),
      { kind: "img", src: "/images/developer/enterprise-connectors.png", alt: "Enterprise Connectors diagram", width: 902, height: 338 },
    ],
  },
  {
    id: "enterprise-connector-sdk",
    title: "Enterprise Connector SDK",
    subtitle: "Enterprise Connector SDK",
    blocks: [
      p("The Enterprise Connector SDK provide a framework for creating your own custom Enterprise Connectors. The SDK provides a series classes to communicate with the VANTIQ and a series of interfaces that need to be implemented to allow the VANTIQ server to communicate with the Enterprise Connector."),
      p("A more detailed description of the SDK and access to the source for the SDK can be found in the following public GitHub repository ", gh("extjsdk")),
    ],
  },
  {
    id: "prebuilt-enterprise-connectors",
    title: "Prebuilt Enterprise Connectors",
    subtitle: "Prebuilt Enterprise Connectors",
    blocks: [
      p(
        "As well as the SDK there are several prebuilt Enterprise Connectors. These are all available via the same repository as the SDK; ",
        { href: GH, text: GH },
        ". If customers want they can also submit their own implementations to this repository, VANTIQ’s engineering team will check and verify any custom enterprise connectors that are submitted.",
      ),
    ],
  },
  {
    id: "jdbc-enterprise-connector",
    title: "JDBC Enterprise Connector",
    subtitle: "JDBC Enterprise Connector",
    blocks: [
      p("The JDBC Enterprise Connect a user to construct applications that interact with a SQL Database, and supports almost all standard SQL Commands. These interactions include the ability to run queries against the aforementioned SQL Database, periodically poll the database, and use all of the returned data in the given project."),
      p("In order to incorporate this Extension Source, you will need to set up your local machine with a JDBC Driver that can connect to your SQL Database."),
      p("The JDBC Enterprise Connector can be accessed via the following GitHub repository ", gh("jdbcSource")),
    ],
  },
  {
    id: "apache-camel-connector",
    title: "Apache Camel Connector",
    subtitle: "Apache Camel Connector",
    blocks: [
      p("Using the Apache Camel Connector, developers can build Apache Camel applications that interact with Vantiq applications."),
      p("The Vantiq Apache Camel Connector is configured with the Camel application desired, and, using that definition, discovers, downloads, provisions the connector, running the application using the appropriate Apache Camel Components as specified in the routes included in the configuration."),
      p("The Apache Camel Connector can be accessed via the following GitHub repository ", gh("camelConnector")),
    ],
  },
  {
    id: "jms-enterprise-connector",
    title: "JMS Enterprise Connector",
    subtitle: "JMS Enterprise Connector",
    blocks: [
      p("The JMS Enterprise Connector allows a user to construct applications that interact with a JMS Server. These interactions include the ability to produce messages to and consume messages from JMS Topics and Queues."),
      p("In order to incorporate this Enterprise Connector, you will need to set up your local machine with all JMS Server dependencies needed to connect to your JMS Server. Once you have done this, you will need to create the VANTIQ Source."),
      p("The JMS Enterprise Connector can be accessed via the following GitHub repository ", gh("jmsSource")),
    ],
  },
  {
    id: "object-recognition-enterprise-connector",
    title: "Object Recognition Enterprise Connector",
    subtitle: "Object Recognition Enterprise Connector",
    blocks: [
      p("The Object Recognition Enterprise Connector allows a user to store and process data with VANTIQ, all of which is collected by analyzing images/videos using any Tensorflow-compatible Neural Network."),
      p("This implementation of the Object Recognition Source includes built-in functionality for the YOLO Processor, though any Tensorflow-compatible neural network can be used by implementing the NeuralNetInterface. Additionally, this implementation includes functionality to retrieve four different types of images:"),
      p("Camera Retriever – used to retrieve images from a serially-connected camera."),
      p("Network Stream Retriever – used to retrieve images from a network-connected camera."),
      p("File Retriever – used to retrieve images and videos from disk."),
      p("FTP Retriever – used to retrieve images through FTP, FTPS, and SFTP."),
      p("The Object Recognition Enterprise Connector can be accessed via the following GitHub repository ", gh("objectRecognitionSource")),
    ],
  },
  {
    id: "opc-ua-enterprise-connector",
    title: "OPC UA Enterprise Connector",
    subtitle: "OPC UA Enterprise Connector",
    blocks: [
      p("OPC UA Enterprise Connector is an Enterprise Connector for interoperability between OPC UA Servers and the VANTIQ system."),
      p("OPC (Open Platform Communications) is an interoperability standard for use in the industrial automation space and in other industries. The OPC Foundation is responsible for the development and maintenance of this standard. OPC Unified Architecture (OPC UA) is a platform independent service-oriented architecture that integrates all the functionality of the individual OPC Classic specifications into one extensible framework."),
      p("The OPC UA Enterprise Connector can be accessed via the following GitHub repository ", gh("opcuaSource")),
    ],
  },
  {
    id: "udp-enterprise-connector",
    title: "UDP Enterprise Connector",
    subtitle: "UDP Enterprise Connector",
    blocks: [
      p("The UDP Enterprise Connector allows a user to exchange data between VANTIQ and a UDP host/port. The UCP Enterprise Connector can exchange strings, CSV and XML data."),
      p("The UDP Enterprise Connector can be accessed via the following GitHub repository ", gh("udpSource")),
    ],
  },
  {
    id: "python-execution-connector",
    title: "Python Execution Connector & Enterprise Connector SDK",
    subtitle: "Python Execution Connector & Enterprise Connector SDK",
    blocks: [
      p("Developers can execute Python code as directed by a Vantiq server with the use of the Python Execution Connector, available at: ", gh("pythonExecSource")),
      p("Developers can also write extension sources in Python. The Python Execution Connector is for executing Python Code, and it’s available here: ", gh("extpsdk")),
    ],
  },
];
