

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


  export const GenerateCourseLayout_AI = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate a JSON object for a course layout with the following structure:\n\n{\n  \"course\": {\n    \"name\": \"Course Name\",\n    \"description\": \"Course Description\",\n    \"chapters\": [\n      {\n        \"name\": \"Chapter Name\",\n        \"about\": \"Chapter Description\",\n        \"duration\": \"Chapter Duration\"\n      }\n    ],\n    \"category\": \"Course Category\",\n    \"topic\": \"Course Topic\",\n    \"level\": \"Course Level\",\n    \"duration\": \"Course Duration\",\n    \"numberOfChapters\": Number // Ensure this is a number, not a string\n  }\n}\n\nUse the following details:\n- Course Name: Following Detail With Files in Python\n- Description: This course provides a foundational understanding of file handling in Python...\n- Category: Programming\n- Topic: Python\n- Level: Basic\n- Duration: 1 Hour\n- Number of Chapters: 5\n- Chapter Details:\n  1. Name: Introduction to File I/O\n     About: This chapter introduces the core concepts of file input/output (I/O) in Python...\n     Duration: 15 minutes\n  // Other chapters...\n\nEnsure the output is a valid JSON object with the exact structure provided above. Do not include any additional text or explanations outside the JSON object."},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"course\": {\n    \"name\": \"Following Detail With Files in Python\",\n    \"description\": \"This course provides a foundational understanding of file handling in Python...\",\n    \"chapters\": [\n      {\n        \"name\": \"Introduction to File I/O\",\n        \"about\": \"This chapter introduces the core concepts of file input/output (I/O) in Python...\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"name\": \"Opening and Closing Files\",\n        \"about\": \"Learn how to open files in different modes (read, write, append) and the importance of closing them properly.\",\n        \"duration\": \"10 minutes\"\n      },\n      {\n        \"name\": \"Reading From Files\",\n        \"about\": \"Explore various methods for reading content from files, including reading line by line and reading the entire file.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"name\": \"Writing to Files\",\n        \"about\": \"Understand how to write data to files, covering different writing methods and overwriting versus appending.\",\n        \"duration\": \"10 minutes\"\n      },\n      {\n        \"name\": \"Working with Different File Types\",\n        \"about\": \"Brief introduction to working with different file types like CSV and TXT files with basic functionalities.\",\n         \"duration\": \"10 minutes\"\n      }\n\n    ],\n    \"category\": \"Programming\",\n    \"topic\": \"Python\",\n    \"level\": \"Basic\",\n    \"duration\": \"1 Hour\",\n    \"numberOfChapters\": 5\n  }\n}\n```\n"},
        ],
      },
    ],
  });




  export const GenerateChapterContent_AI = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Explain the concept in Detail on Topic: Python Basic, Chapter: Variables and Data Types, in JSON Format with list of array with field as title, explanation on give chapter in detail, Code Example (Code field in <precode> format) if applicable"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"topic\": \"Python Basics\",\n  \"chapter\": \"Variables and Data Types\",\n  \"sections\": [\n    {\n      \"title\": \"Introduction to Variables\",\n      \"explanation\": \"In Python, a variable is a named storage location in the computer's memory that holds a value. Think of it as a container that can store different types of data. Unlike some other languages, you don't need to explicitly declare the type of a variable before using it; Python infers the type based on the value assigned to it. Variable names are case-sensitive, and should follow some rules (start with a letter or underscore, and contain only alphanumeric characters and underscores). Choosing descriptive names improves code readability.\",\n       \"code_example\": null\n    },\n    {\n      \"title\": \"Variable Assignment\",\n      \"explanation\": \"The assignment operator `=` is used to assign a value to a variable.  The syntax is `variable_name = value`. The value on the right side is evaluated, and the result is stored in the variable on the left side. It's important to understand that the assignment is not an algebraic equation.  It is a command to store the computed value in the variable.\",\n      \"code_example\": {\n        \"language\": \"python\",\n        \"code\": \"<pre>x = 10\\nmessage = \\\"Hello, World!\\\"\\npi = 3.14159\\n</pre>\"\n      }\n    },\n    {\n      \"title\": \"Data Types: Introduction\",\n       \"explanation\": \"Python supports various data types to handle different kinds of information.  The most common ones include numbers (integers, floats), text (strings), booleans (True/False), and collections (lists, tuples, dictionaries, sets). The type of data determines what operations can be performed on it.\",\n       \"code_example\": null\n     },\n    {\n      \"title\": \"Numeric Data Types: Integers\",\n      \"explanation\": \"Integers (int) represent whole numbers, both positive and negative, without any decimal points.  They can be of any length limited by the computer’s memory.\",\n      \"code_example\": {\n         \"language\": \"python\",\n         \"code\": \"<pre>age = 30\\ncount = -50\\nlarge_number = 1234567890\\nprint(type(age))\\nprint(type(count))\\n</pre>\"\n       }\n    },\n    {\n      \"title\": \"Numeric Data Types: Floating-Point Numbers\",\n      \"explanation\": \"Floating-point numbers (float) represent real numbers with decimal points. They are used for representing fractional values. Note that floats are stored internally with finite precision, so calculations might involve rounding errors.\",\n      \"code_example\": {\n         \"language\": \"python\",\n         \"code\": \"<pre>price = 99.99\\npi = 3.14159\\nvelocity = -2.5\\nprint(type(price))\\n</pre>\"\n       }\n    },\n     {\n      \"title\": \"String Data Type\",\n       \"explanation\": \"Strings (str) are sequences of characters used to represent text.  They can be enclosed in single quotes (`'...'`), double quotes (`\\\"...\\\"`), or triple quotes (`'''...'''` or `\\\"\\\"\\\"...\\\"\\\"\\\"`).  Triple quotes are useful for multiline strings.\",\n      \"code_example\": {\n         \"language\": \"python\",\n         \"code\": \"<pre>name = 'Alice'\\ngreeting = \\\"Hello!\\\"\\nmultiline_text = '''This is a\\nmultiline\\nstring.'''\\nprint(type(name))\\n</pre>\"\n       }\n    },\n     {\n      \"title\": \"Boolean Data Type\",\n      \"explanation\": \"Boolean (bool) represents logical values, either `True` or `False`. They are used in conditional statements and logical operations.\",\n      \"code_example\": {\n         \"language\": \"python\",\n         \"code\": \"<pre>is_valid = True\\npassed_exam = False\\nprint(type(is_valid))\\n</pre>\"\n       }\n    },\n    {\n      \"title\": \"Type Conversion (Casting)\",\n      \"explanation\": \"You can convert between data types using built-in functions like `int()`, `float()`, and `str()`. This is known as type casting or type conversion. However, conversion isn’t always possible and may lead to an error.\",\n      \"code_example\": {\n         \"language\": \"python\",\n         \"code\": \"<pre>x = 10\\ny = float(x)  # Convert int to float\\nz = \\\"20\\\"\\na = int(z) # Convert string to int\\nprint(type(x), type(y), type(z), type(a))</pre>\"\n       }\n    },\n    {\n      \"title\": \"Dynamic Typing\",\n       \"explanation\": \"Python is a dynamically typed language, which means that the type of a variable is determined during runtime, and it can change as you assign different values to it. You don't have to explicitly specify the type when declaring a variable. This offers flexibility but can also lead to errors if types are not handled carefully.\",\n       \"code_example\": {\n        \"language\": \"python\",\n        \"code\": \"<pre>my_var = 10   # my_var is an integer\\nprint(type(my_var))\\nmy_var = \\\"Hello\\\" #my_var is a string now\\nprint(type(my_var))\\n</pre>\"\n       }\n    },\n     {\n      \"title\": \"Checking Data Type using type() function\",\n      \"explanation\": \"You can check the type of a variable or value at any point using the built-in function `type()`. This is helpful for debugging and ensuring that your code is behaving as expected.\",\n       \"code_example\": {\n        \"language\": \"python\",\n        \"code\": \"<pre>age = 25\\nname = \\\"Bob\\\"\\nprint(type(age))\\nprint(type(name))</pre>\"\n      }\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });

  // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  // console.log(result.response.text());


