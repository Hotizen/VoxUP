// Service for executing Python code in a sandboxed environment
class CodeExecutionService {
  constructor() {
    this.apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
  }

  async executeCode(code, language = 'python') {
    try {
      const response = await fetch(`${this.apiUrl}/run-python`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Code execution failed');
      }

      return {
        success: true,
        output: data.result || '',
        error: null
      };
    } catch (error) {
      return {
        success: false,
        output: '',
        error: error.message
      };
    }
  }

  async validateCode(code, expectedOutput) {
    const result = await this.executeCode(code);
    
    if (!result.success) {
      return {
        isValid: false,
        message: `Error: ${result.error}`,
        output: result.output
      };
    }

    const actualOutput = result.output.trim();
    const expected = expectedOutput.trim();

    if (actualOutput === expected) {
      return {
        isValid: true,
        message: 'Great! Your code produces the expected output.',
        output: actualOutput
      };
    } else {
      return {
        isValid: false,
        message: `Output doesn't match. Expected: "${expected}", Got: "${actualOutput}"`,
        output: actualOutput
      };
    }
  }

  async runTests(code, testCases) {
    const results = [];
    
    for (const testCase of testCases) {
      const testCode = testCase.input ? 
        `${code}\n# Test input: ${testCase.input}` : 
        code;
      
      const result = await this.executeCode(testCode);
      
      results.push({
        input: testCase.input,
        expected: testCase.expectedOutput,
        actual: result.output?.trim() || '',
        passed: result.success && result.output?.trim() === testCase.expectedOutput.trim(),
        error: result.error
      });
    }
    
    return results;
  }

  // Simulate code execution locally for development
  simulateExecution(code) {
    try {
      // Simple simulation for common Python patterns
      if (code.includes('print("Hello, World!")')) {
        return { success: true, output: 'Hello, World!', error: null };
      }
      
      if (code.includes('print(') && code.includes('"')) {
        const match = code.match(/print\("([^"]+)"\)/);
        if (match) {
          return { success: true, output: match[1], error: null };
        }
      }
      
      if (code.includes('for i in range(')) {
        const match = code.match(/range\((\d+)\)/);
        if (match) {
          const count = parseInt(match[1]);
          const output = Array.from({ length: count }, (_, i) => i).join('\n');
          return { success: true, output, error: null };
        }
      }
      
      return { 
        success: true, 
        output: 'Code executed successfully (simulated)', 
        error: null 
      };
    } catch (error) {
      return { 
        success: false, 
        output: '', 
        error: error.message 
      };
    }
  }
}

export default new CodeExecutionService();