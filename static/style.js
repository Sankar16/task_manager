/* General Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f4f7f6;
    color: #333;
    padding: 20px;
}

h1 {
    color: #4CAF50;
    text-align: center;
    margin-bottom: 20px;
}

form {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto 20px auto;
}

form input {
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1em;
}

form button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

form button:hover {
    background-color: #45a049;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
}

th, td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
    text-align: center;
    font-size: 0.9em;
}

th {
    background-color: #4CAF50;
    color: white;
    font-weight: normal;
}

td {
    background-color: #f9f9f9;
}

td button {
    padding: 6px 12px;
    font-size: 0.9em;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

td button:hover {
    opacity: 0.9;
}

td button:nth-child(1) {
    background-color: #4CAF50;
    margin-right: 5px;
}

td button:nth-child(2) {
    background-color: #f44336;
}

/* Hover effect on table rows */
tr:hover td {
    background-color: #f1f1f1;
}
