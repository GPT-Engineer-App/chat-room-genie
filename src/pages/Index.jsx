import React, { useState, useRef, useEffect } from "react";
import { Box, Flex, Input, Button, VStack, Text, useToast } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const endOfMessagesRef = useRef(null);
  const toast = useToast();

  // Example: auto-scroll to the end of messages when new messages arrive
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Cannot send empty message",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setMessages([...messages, { id: messages.length, text: inputValue }]);
    setInputValue("");
  };

  return (
    <Box p={6}>
      <VStack spacing={4}>
        {/* Chat Messages */}
        <Flex direction="column" p={4} bg="gray.100" height="400px" overflowY="scroll" borderRadius="md">
          {messages.map((message) => (
            <Box key={message.id} bg="blue.100" p={3} borderRadius="md" mb={2}>
              <Text>{message.text}</Text>
            </Box>
          ))}
          <div ref={endOfMessagesRef} />
        </Flex>

        {/* Message Input */}
        <Flex>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            placeholder="Type your message here..."
            mr={2}
          />
          <Button onClick={handleSendMessage} colorScheme="blue" rightIcon={<FaPaperPlane />}>
            Send
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Index;
