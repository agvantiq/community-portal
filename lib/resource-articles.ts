/**
 * Full-body content for the handful of catalog items that have their own
 * detail page (see resource-detail-client.tsx's "one page per catalog item"
 * pilot). Keyed by ResourceItem.id, shared by both /resources and
 * /resources/knowledge-base since both link into the same [id] template.
 * Everything else in the catalog still falls back to the generic
 * Type/Category + "More in {category}" view.
 *
 * Content is real — transcribed from the source community.vantiq.com
 * articles, not written for this prototype.
 */
export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  /** Term/detail pairs rendered as a bullet list, e.g. the four Object
   *  Recognition image retrievers. */
  list?: { term: string; detail: string }[];
  code?: string;
  /** External repo/doc link shown at the end of the section. */
  link?: { label: string; href: string };
}

export interface ResourceArticle {
  subtitle: string;
  /** Eyebrow back-link text — the grid this article is actually reachable
   *  from (each of these currently has exactly one real entry point).
   *  Defaults to "Resources" when omitted. */
  backLabel?: string;
  sections: ArticleSection[];
}

export const RESOURCE_ARTICLES: Record<string, ResourceArticle> = {
  "tutorials-analytics": {
    subtitle: "Sentiment Analysis Using Microsoft Azure Machine Learning Studio",
    backLabel: "Knowledge Base",
    sections: [
      {
        heading: "Introduction",
        paragraphs: [
          `The Microsoft Azure Machine Learning Studio (MLStudio) is a workspace for crafting machine learning "experiments". Experiments can be transformed in the MLStudio into Web Services, which allows them to be queried through a RESTful interface to get predications and classifications on demand.`,
          `To get started with MLStudio, visit https://studio.azureml.net/ and sign up for an account if you do not have one already. Microsoft currently allows users to deploy a limited number of experiments for free and provides 10gb of free hosting for your training data. If you aren't familiar with MLStudio already, we recommend watching the tutorials and starting with some of the sample experiments in the experiment gallery. Throughout this tutorial, we'll use a Predictive Experiment for Twitter sentiment analysis found here: https://gallery.cortanaintelligence.com/Experiment/Predictive-Experiment-for-Twitter-sentiment-analysis-3. By the end of this tutorial, you will be able to query this experiment through a Vantiq Analytics Source to get the sentiment of any tweet.`,
        ],
      },
      {
        heading: "Setting Up an MLStudio Experiment",
        paragraphs: [
          `After creating a MLStudio account and logging into the workspace, navigate to https://gallery.cortanaintelligence.com/Experiment/Predictive-Experiment-for-Twitter-sentiment-analysis-3 and click the "Open in Studio" link and click the checkmark on the "Copy experiment to gallery" pop-up. Open the experiment up from the list of experiments in your workspace, click "OK" on the bottom menu bar that indicates the experiment is being upgraded, then click from the bottom menu. Once the run completes (can take around 10 minutes to train the model), select "Deploy Web Service" from the bottom menu and choose the recommended option.`,
          `Once you've deployed the web service, you should be taken to a page that specifies an API key and there should be a table below with rows for the Request/Response API and the Batch API. Select the blue "TEST" button from the Request/Response row and try it out, the response will show up at the bottom of the page. To see what API calls are actually being made here, click on Request/Response in the left hand column. These docs, along with the API key from the previous page are all you need to request Sentiment Analysis from VAIL.`,
        ],
      },
      {
        heading: "Configuring the Vantiq Analytics Source",
        paragraphs: [
          `In order to make requests to MLStudio for predictions using the predictive experiment, create a new Analytics Source in your Vantiq namespace with the name "Sentiment". The Analytics Type is "Microsoft MLStudio" and the Request URI is the POST url specified in the Request/Response docs for your experiment. Specify the API key in the Access Token field then save the Analytics Source.`,
        ],
      },
      {
        heading: "Using the Analytics Source in VAIL",
        paragraphs: [
          `Now that the Analytics Source has been configured, we can try it out in VAIL. Here's an example procedure that takes a single parameter, a message to classify, and returns the response from running the predictive experiment:`,
        ],
        code: `PROCEDURE testSentimentOfStatement(msg)

// Construct the request body
// see the Request/Response docs for more details on how this is formulated
var payload = {"Inputs": { "input1": { "ColumnNames": ["tweet_text"], "Values": [[msg]]}}, "GlobalParameters": {

// Request the prediction from the source
var prediction = SELECT FROM SOURCE Sentiment WITH body = payload

log.info("Prediction result: {}", [prediction])

// Grab the result field
var result = prediction[0].Results

// Get the values from output1 (the name of the final activity in the experiment)
var output = result["output1"]
var values = output.value.Values
// values is actually an array, so get the first index
values = values[0]

// values is an array of length 2
// first value is the direction (positive, neutral, or negative)
// second value is the score
var polarity = values[0]
var score = values[1]

return {polarity: polarity, score: score}`,
      },
    ],
  },

  "extension-sources": {
    subtitle: "Enterprise Connectors for integrating Vantiq with external systems.",
    sections: [
      {
        heading: "Enterprise Connectors Overview",
        paragraphs: [
          `Enterprise Connectors are used to allow VANTIQ to communicate with various other systems. Supported operations include sending a message to the connector (or, more precisely, via the connector to the connected system), having the connector send a message to VANTIQ, and querying the connector (or, more precisely, the system being connected).`,
          `It is important to understand that the interpretation of these operations is determined completely by the connector designer/developer. For example, when sending a message to an enterprise connector, it might be the case that depending upon some parameter in the message, the connector might save the data, invoke some operation, or perform some other action that is appropriate for the data system that connector represents.`,
          `There are a number of prebuilt Enterprise Connectors and there is also an Enterprise Connector SDK that allows you to create your own custom Enterprise Connectors. The SDK and prebuilt enterprise connectors are all open source and each has individual open source licensing which is dependent on the underlying libraries that it integrates with and makes use of.`,
        ],
      },
      {
        heading: "Enterprise Connector SDK",
        paragraphs: [
          `The Enterprise Connector SDK provides a framework for creating your own custom Enterprise Connectors. The SDK provides a series of classes to communicate with VANTIQ and a series of interfaces that need to be implemented to allow the VANTIQ server to communicate with the Enterprise Connector.`,
          `A more detailed description of the SDK and access to the source for the SDK can be found in the following public GitHub repository.`,
        ],
        link: {
          label: "github.com/Vantiq/vantiq-extension-sources/tree/master/extjsdk",
          href: "https://github.com/Vantiq/vantiq-extension-sources/tree/master/extjsdk",
        },
      },
      {
        heading: "Prebuilt Enterprise Connectors",
        paragraphs: [
          `As well as the SDK there are several prebuilt Enterprise Connectors. These are all available via the same repository as the SDK. If customers want they can also submit their own implementations to this repository, VANTIQ's engineering team will check and verify any custom enterprise connectors that are submitted.`,
        ],
        link: {
          label: "github.com/Vantiq/vantiq-extension-sources",
          href: "https://github.com/Vantiq/vantiq-extension-sources",
        },
      },
      {
        heading: "JDBC Enterprise Connector",
        paragraphs: [
          `The JDBC Enterprise Connector lets a user construct applications that interact with a SQL Database, and supports almost all standard SQL Commands. These interactions include the ability to run queries against the aforementioned SQL Database, periodically poll the database, and use all of the returned data in the given project.`,
          `In order to incorporate this Extension Source, you will need to set up your local machine with a JDBC Driver that can connect to your SQL Database.`,
        ],
        link: {
          label: "github.com/Vantiq/vantiq-extension-sources/tree/master/jdbcSource",
          href: "https://github.com/Vantiq/vantiq-extension-sources/tree/master/jdbcSource",
        },
      },
      {
        heading: "Apache Camel Connector",
        paragraphs: [
          `Using the Apache Camel Connector, developers can build Apache Camel applications that interact with Vantiq applications.`,
          `The Vantiq Apache Camel Connector is configured with the Camel application desired, and, using that definition, discovers, downloads, provisions the connector, running the application using the appropriate Apache Camel Components as specified in the routes included in the configuration.`,
        ],
        link: {
          label: "github.com/Vantiq/vantiq-extension-sources/tree/master/camelConnector",
          href: "https://github.com/Vantiq/vantiq-extension-sources/tree/master/camelConnector",
        },
      },
      {
        heading: "JMS Enterprise Connector",
        paragraphs: [
          `The JMS Enterprise Connector allows a user to construct applications that interact with a JMS Server. These interactions include the ability to produce messages to and consume messages from JMS Topics and Queues.`,
          `In order to incorporate this Enterprise Connector, you will need to set up your local machine with all JMS Server dependencies needed to connect to your JMS Server. Once you have done this, you will need to create the VANTIQ Source.`,
        ],
        link: {
          label: "github.com/Vantiq/vantiq-extension-sources/tree/master/jmsSource",
          href: "https://github.com/Vantiq/vantiq-extension-sources/tree/master/jmsSource",
        },
      },
      {
        heading: "Object Recognition Enterprise Connector",
        paragraphs: [
          `The Object Recognition Enterprise Connector allows a user to store and process data with VANTIQ, all of which is collected by analyzing images/videos using any Tensorflow-compatible Neural Network.`,
          `This implementation of the Object Recognition Source includes built-in functionality for the YOLO Processor, though any Tensorflow-compatible neural network can be used by implementing the NeuralNetInterface. Additionally, this implementation includes functionality to retrieve four different types of images:`,
        ],
        list: [
          { term: "Camera Retriever", detail: "used to retrieve images from a serially-connected camera." },
          { term: "Network Stream Retriever", detail: "used to retrieve images from a network-connected camera." },
          { term: "File Retriever", detail: "used to retrieve images and videos from disk." },
          { term: "FTP Retriever", detail: "used to retrieve images through FTP, FTPS, and SFTP." },
        ],
        link: {
          label: "github.com/Vantiq/vantiq-extension-sources/tree/master/objectRecognitionSource",
          href: "https://github.com/Vantiq/vantiq-extension-sources/tree/master/objectRecognitionSource",
        },
      },
      {
        heading: "OPC UA Enterprise Connector",
        paragraphs: [
          `OPC UA Enterprise Connector is an Enterprise Connector for interoperability between OPC UA Servers and the VANTIQ system.`,
          `OPC (Open Platform Communications) is an interoperability standard for use in the industrial automation space and in other industries. The OPC Foundation is responsible for the development and maintenance of this standard. OPC Unified Architecture (OPC UA) is a platform independent service-oriented architecture that integrates all the functionality of the individual OPC Classic specifications into one extensible framework.`,
        ],
        link: {
          label: "github.com/Vantiq/vantiq-extension-sources/tree/master/opcuaSource",
          href: "https://github.com/Vantiq/vantiq-extension-sources/tree/master/opcuaSource",
        },
      },
      {
        heading: "UDP Enterprise Connector",
        paragraphs: [
          `The UDP Enterprise Connector allows a user to exchange data between VANTIQ and a UDP host/port. The UDP Enterprise Connector can exchange strings, CSV and XML data.`,
        ],
        link: {
          label: "github.com/Vantiq/vantiq-extension-sources/tree/master/udpSource",
          href: "https://github.com/Vantiq/vantiq-extension-sources/tree/master/udpSource",
        },
      },
      {
        heading: "Python Execution Connector & Enterprise Connector SDK",
        paragraphs: [
          `Developers can execute Python code as directed by a Vantiq server with the use of the Python Execution Connector.`,
          `Developers can also write extension sources in Python. The Python Execution Connector is for executing Python Code, and it's available here:`,
        ],
        link: {
          label: "github.com/Vantiq/vantiq-extension-sources/tree/master/pythonExecSource",
          href: "https://github.com/Vantiq/vantiq-extension-sources/tree/master/pythonExecSource",
        },
      },
    ],
  },
};
