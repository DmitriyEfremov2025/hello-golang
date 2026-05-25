package neuralnet

import (
	"math"
	"math/rand"
	"testing"
)

func TestXOR(t *testing.T) {
	rand.Seed(42)

	nn := New([]int{2, 8, 1}, 2.0)

	inputs := [][]float64{
		{0, 0},
		{0, 1},
		{1, 0},
		{1, 1},
	}
	targets := [][]float64{
		{0},
		{1},
		{1},
		{0},
	}

	loss := nn.Fit(inputs, targets, 10000)
	if loss > 0.01 {
		t.Fatalf("loss too high after training: %.6f", loss)
	}

	for i, input := range inputs {
		output := nn.Predict(input)
		expected := targets[i][0]
		if math.Abs(output[0]-expected) > 0.1 {
			t.Errorf("XOR(%v) = %.4f, want %.0f", input, output[0], expected)
		}
	}
}

func TestNetworkCreation(t *testing.T) {
	nn := New([]int{3, 5, 2}, 0.1)

	if len(nn.weights) != 2 {
		t.Fatalf("expected 2 weight layers, got %d", len(nn.weights))
	}
	if len(nn.weights[0]) != 5 {
		t.Errorf("expected 5 neurons in hidden layer, got %d", len(nn.weights[0]))
	}
	if len(nn.weights[0][0]) != 3 {
		t.Errorf("expected 3 input weights per hidden neuron, got %d", len(nn.weights[0][0]))
	}
	if len(nn.weights[1]) != 2 {
		t.Errorf("expected 2 neurons in output layer, got %d", len(nn.weights[1]))
	}
}

func TestPredict(t *testing.T) {
	rand.Seed(1)
	nn := New([]int{2, 3, 1}, 0.5)

	output := nn.Predict([]float64{0.5, 0.5})
	if len(output) != 1 {
		t.Fatalf("expected 1 output, got %d", len(output))
	}
	if output[0] < 0 || output[0] > 1 {
		t.Errorf("output %.4f out of sigmoid range [0,1]", output[0])
	}
}
