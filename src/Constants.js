
export const data = {"OPENAI_API_KEY":"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"}

export const sample_questions_code_correction = [
    {
        "completions" : 
        [
            {"question" : "ar a=10;var b=5; var c=a+b; return c;"},
            {"question" : "var a=;var b=5; var c=a*b; return c;"},
            {"question" : " a=10;var b=5; var c=a/b; return c;" },//hint a is not defined
            {"question" : "var a=10;var b=5; var c=a+b; return null;"},
           
        ]}
];

export const sample_questions_explain_code = [
    {
        "completions" : 
        [
            {"question" : "var a=10;var b=5; var c=a+b; return c;"},
            {"question" : "var a=10;var b=5; var c=a*b; return c;"},
            {"question" : "var a=10;var b=5; var c=a/b; return c;"},
            {"question" : "var a=10;var b=5; var c=a+b; return null;"},
           
        ]}
];

export const sample_questions_correction = [
    {
        "completions" : 
        [
            {"question" : "Rajiv Gandhi borning country name"},
            {"question" : "modi's feather naem"},
            {"question" : "englis "},
            {"question" : "JAPANASE"},
            {"question" : "today is wenesday"},
            
        ]}
];

export const sample_questions_completion = [
    {
        "completions" : 
        [
            {"question" : "Rajiv Gandhi born country name"},
            {"question" : "fathers name of PM Shri Narendra modi"},
            {"question" : "Who Invented React JS"},
            {"question" : "When Facebook Company became Meta"},
            {"question" : "Write a tagline for an ice cream shop."},
            
        ]}
];

export const sample_questions_translation = [
    {
        "completions" : 
        [
            {"question" : "Where did Rajiv Gandhi Born"},
            {"question" : "What is the full name of Narendra Modi"},
            {"question" : "Who Invented React JS"},
            {"question" : "When Facebook Company became Meta"},
            {"question" : "Write a tagline for an ice cream shop."},
            
        ]}
];

export const sample_questions_learnings = [
    {
        "completions" : 
        [
            {
                "system" : "You are shop owner at Pune Maharashtra pin code 411041",
                "assistant" : "We have only 2 type of grains wheat and rice price of rice is 50 Rs kg and wheat is 30 Rs kg - your shop name is Infogain Mall",
                "question" : ""
            },
            {
                "system" : "You are assistant of techysam youtuber and blogger, your name is Genie working with TechySam from last 10+ years",
                "assistant" : "TechySam is a rich youtuber having more than 1 Million followers on Youtube and more than 10M students on Udemy",
                "questions" : [
                    { "question 1" : "techysam followers are less than 1k right " },
                    { "question 2" : "What is your name " },
                    { "question 3" : "How long you have been working with your Boss " },
                    { "question 3" : "what is the url of techysam" }
                ]
            },
            
            
        ]}
];