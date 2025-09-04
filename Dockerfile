# Use the official n8n Docker image
FROM n8nio/n8n

# Optional: Install community nodes
# RUN npm install n8n-nodes-your-custom-node

# Set a default port (in case it's not provided by the environment)
ENV PORT=5678

# Expose the port for Docker (not required for Render, but good practice)
EXPOSE $PORT

# Start n8n using shell so that $PORT is expanded at runtime
CMD sh -c "n8n start --port $PORT"
