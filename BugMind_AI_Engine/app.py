from flask import Flask, jsonify, request
from flask_cors import CORS # Handles cross-origin requests
import engine
import json

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

@app.route('/generate/<ticketid>', methods=['POST'])
def get_script(ticketid):
    ticketcontents = engine.getContent(ticketid)
    if ticketcontents!="Could not Generate Solution" or ticketcontents!="Server Error":
        summary = ticketcontents["summary"]
        description = ticketcontents["description"]
        priority = ticketcontents["priority"]
        labels = ticketcontents["labels"]
        ticket_type = ticketcontents["ticket_type"]
        image = ticketcontents["image"]
        logs = ticketcontents["logs"]
        code = ticketcontents["code"]

        labelval=""
        for ind,label in enumerate(labels):
            if ind+1==len(labels):
                labelval+=label
            else:
                labelval+=label+","
        
        imgList=[]
        for img in image:
            imgList.append(engine.decode_base64_to_pillow(img))

        codeval=f", code as {code}. If a direct code fix is possible, include the `code_fix` field with the necessary changes. If a code fix is not immediately applicable (e.g., a configuration issue), do not include the `code_fix` field." if code!="" else ""
        labelstr=f", labels as {labelval}" if labelval!="" else ""
        logval=f", logs as {logs}" if logs!="" else ""
        query = f"Generate a resolution of this ticket with summary as {summary}, description as {description}, priority as {priority}, ticket type as {ticket_type}{logval}{labelstr}{codeval}"
        response = engine.generateSol(query,imgList) 
        response_json = response

        return response_json
    else:
        response_json = {"message":ticketcontents}

        return response_json

if __name__ == '__main__':
    # Run the app on port 5000
    app.run(debug=True, port=5000) 
