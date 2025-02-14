# Braid Web 

## Table of Contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Licence](#licence)

## General info
A front end to the Braid Studio.

** @Boxer ** is an AI-enabled Learning Management System (LMS). The objective is to be able to build a curriculum of content by processing open-source documents from the web (YouTube videos, GitHub repositories, and plan HTML text) and loading AI generated summaries into a document store. A simple front end then enables students to navigate through the content, can answer questions based on the embedded content, and recommend next steps once the student is familiar with a certain level of content. 

The specific domain is to teach participants how to build AI applications using modern Large Language Model (LLM) technology, and the current approaches to this - Retrieval Assisted Generation (RAG), and multi-step workflows using the LLM to generate summaries and process questions.

The benefits of this approach are:
- It is simple to maintain content, given that the field is moving so rapidly. Traditional approaches of generating bespoke new content are often obsolete by the time they are ready. 
- Participants get a flavour of what is possible with modern AI by using the tools. 

** Waterfall ** is a Python framework designed for processing documents using an AI enrichment pipeline. It automates document processing, enrichment, and analysis. The system is primarily focused on curated educational content related to AI/ML.

The framework is composed of two main pipelines:

- Waterfall Pipeline: This is the core pipeline, which retrieves documents using the Google Search API. It generates AI-powered summaries of these documents and calculates document embeddings for semantic analysis. It then performs clustering to group related content and generates interactive analysis reports, sending email summaries to leadership.
- Boxer Pipeline: This pipeline builds a knowledge base by downloading and processing content from web URLs and YouTube playlists. It chunks documents into processable segments, generates summaries and embeddings, and powers the semantic search functionality in the Boxer interface.

Key features of Waterfall include:

- Document retrieval from multiple sources such as the Google Search API, web URLs, and YouTube playlists.
- Text summarisation using AI models.
- Embedding generation for semantic search and clustering.
- Automated cluster analysis and reporting.
- Email notifications with insights.
- Integration with a Boxer search interface.

## Technologies 
This website is written in HTML5 and Bootstrap (https://getbootstrap.com/). This app is deliberately as thin as possible. All the complex logic is in the Braid Studio repo.

   ## Licence
GNU AFFERO GENERAL PUBLIC LICENSE.

This is intentionally a restrictive licence. The source is effectively available for non-commercial use (subject to the licence terms as listed, which enable use for learning, self study etc). Commercial use either must abide by the licence terms, which are strong, or a separate licence that enables more normal commercial use & distribution is available from Braid. Contact us for more details mailto:info@braidtechnologies.io. 




