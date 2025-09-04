FROM n8nio/n8n

# Optional: Install community nodes
# RUN npm install n8n-nodes-your-custom-node

# Expose the port
EXPOSE 5678

CMD ["sh", "-c", "n8n start --port $PORT"]
