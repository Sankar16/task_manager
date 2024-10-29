from flask import Flask, jsonify, request, render_template
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname="task_manager_db",
    user="strange1610",
    password="yourpassword",  # Replace with your actual password
    host="localhost"
)
cursor = conn.cursor(cursor_factory=RealDictCursor)

# Serve the main UI page
@app.route('/')
def index():
    return render_template('index.html')

# Create a new task
@app.route('/task', methods=['POST'])
def create_task():
    data = request.get_json()
    try:
        cursor.execute(
            "INSERT INTO task (title, description, priority) VALUES (%s, %s, %s) RETURNING *",
            (data['title'], data['description'], data['priority'])
        )
        new_task = cursor.fetchone()
        conn.commit()
        return jsonify(new_task), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 400

# Retrieve all tasks
@app.route('/task', methods=['GET'])
def get_tasks():
    cursor.execute("SELECT * FROM tasks")
    tasks = cursor.fetchall()
    return jsonify(tasks)

# Update a task
@app.route('/task/<int:id>', methods=['PUT'])
def update_task(id):
    data = request.get_json()
    try:
        cursor.execute(
            "UPDATE task SET title = %s, description = %s, priority = %s, status = %s WHERE id = %s RETURNING *",
            (data['title'], data['description'], data['priority'], data['status'], id)
        )
        updated_task = cursor.fetchone()
        if updated_task is None:
            return jsonify({"error": "Task not found"}), 404
        conn.commit()
        return jsonify(updated_task)
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 400

# Delete a task
@app.route('/task/<int:id>', methods=['DELETE'])
def delete_task(id):
    try:
        cursor.execute("DELETE FROM task WHERE id = %s RETURNING *", (id,))
        deleted_task = cursor.fetchone()
        if deleted_task is None:
            return jsonify({"error": "Task not found"}), 404
        conn.commit()
        return jsonify(deleted_task)
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
