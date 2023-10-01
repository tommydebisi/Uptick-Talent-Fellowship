# Install node version 18.17.1
FROM node:18.17.1

# Create app directory
WORKDIR /src

# Copy all files from current directory to working directory
COPY . /src

# Install app dependencies
RUN npm install

# Expose port 5000
EXPOSE 3000

# Run app
CMD ["npm", "start"]