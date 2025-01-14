

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


  export const GenerateCourseLayout_AI = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate a JSON object with the following structure and details:\n\nThe JSON should contain a top-level object named course.\nUnder course, include the following fields:\nname: The name of the course (string).\ndescription: A brief description of the course (string).\nchapters: An array of objects, where each object represents a chapter and contains:\nname: The name of the chapter (string).\nabout: A brief description of the chapter (string).\nduration: The estimated duration of the chapter (string).\ncategory: The category of the course (string, e.g., \"Programming\").\ntopic: The topic of the course (string, e.g., \"Python\").\nlevel: The difficulty level of the course (string, e.g., \"Basic\").\nduration: The total duration of the course (string, e.g., \"1 Hour\").\nnumberOfChapters: The total number of chapters (integer).\nDetails to Use:\nCourse Name: Following Detail With Files in Python\nDescription: This course provides a foundational understanding of file handling in Python. You'll learn how to read from and write to files, explore different file modes, and implement robust error handling techniques. This knowledge is essential for building practical applications that interact with persistent data.\nCategory: Programming\nTopic: Python\nLevel: Basic\nDuration: 1 Hour\nNumber of Chapters: 5\nChapter Details:\nName: Introduction to File I/O\nAbout: This chapter introduces the core concepts of file input/output (I/O) in Python. You'll learn about different file types (text, binary), understand the importance of file handling in programming, and explore the fundamental terminology used in file operations.\nDuration: 15 minutes\n\nName: Opening and Closing Files\nAbout: This chapter focuses on the essential open() function in Python. You'll learn how to open files in various modes (read, write, append, etc.) and the significance of closing files properly to prevent resource leaks. You'll also discover the convenient with statement for automatic file handling.\nDuration: 15 minutes\n\nName: Reading from Files\nAbout: This chapter delves into techniques for reading data from text files. You'll explore various methods like read(), readline(), and readlines() and learn how to choose the most appropriate method for different scenarios. You'll also learn how to effectively extract and process data from files.\nDuration: 15 minutes\n\nName: Writing to Files\nAbout: This chapter focuses on writing data to text files. You'll learn how to use the write() and writelines() methods to add new content to files. You'll also explore how to create new files, append data to existing ones, and overwrite file contents when necessary.\nDuration: 10 minutes\n\nName: Handling File Errors and Best Practices\nAbout: This chapter introduces robust error handling techniques for file operations. You'll learn how to use try-except blocks to gracefully handle potential errors like file not found or permission issues. You'll also discover best practices for secure and efficient file handling in Python.\nDuration: 15 minutes"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"course\": {\n    \"name\": \"Following Detail With Files in Python\",\n    \"description\": \"This course provides a foundational understanding of file handling in Python. You'll learn how to read from and write to files, explore different file modes, and implement robust error handling techniques. This knowledge is essential for building practical applications that interact with persistent data.\",\n    \"chapters\": [\n      {\n        \"name\": \"Introduction to File I/O\",\n        \"about\": \"This chapter introduces the core concepts of file input/output (I/O) in Python. You'll learn about different file types (text, binary), understand the importance of file handling in programming, and explore the fundamental terminology used in file operations.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"name\": \"Opening and Closing Files\",\n        \"about\": \"This chapter focuses on the essential open() function in Python. You'll learn how to open files in various modes (read, write, append, etc.) and the significance of closing files properly to prevent resource leaks. You'll also discover the convenient with statement for automatic file handling.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"name\": \"Reading from Files\",\n        \"about\": \"This chapter delves into techniques for reading data from text files. You'll explore various methods like read(), readline(), and readlines() and learn how to choose the most appropriate method for different scenarios. You'll also learn how to effectively extract and process data from files.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"name\": \"Writing to Files\",\n        \"about\": \"This chapter focuses on writing data to text files. You'll learn how to use the write() and writelines() methods to add new content to files. You'll also explore how to create new files, append data to existing ones, and overwrite file contents when necessary.\",\n        \"duration\": \"10 minutes\"\n      },\n      {\n        \"name\": \"Handling File Errors and Best Practices\",\n         \"about\": \"This chapter introduces robust error handling techniques for file operations. You'll learn how to use try-except blocks to gracefully handle potential errors like file not found or permission issues. You'll also discover best practices for secure and efficient file handling in Python.\",\n        \"duration\": \"15 minutes\"\n      }\n    ],\n    \"category\": \"Programming\",\n    \"topic\": \"Python\",\n    \"level\": \"Basic\",\n    \"duration\": \"1 Hour\",\n    \"numberOfChapters\": 5\n  }\n}\n```\n"},
        ],
      },
    ],
  });

  // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  // console.log(result.response.text());