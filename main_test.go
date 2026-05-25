package main

import "testing"

func TestMiddle(t *testing.T) {
	tests := []struct {
		name       string
		a, b, c    int
		wantMiddle int
	}{
		{name: "already sorted", a: 1, b: 2, c: 3, wantMiddle: 2},
		{name: "reverse sorted", a: 3, b: 2, c: 1, wantMiddle: 2},
		{name: "mixed negatives", a: -10, b: 7, c: 0, wantMiddle: 0},
		{name: "duplicates", a: 5, b: 5, c: 1, wantMiddle: 5},
		{name: "bounds", a: -1000, b: 1000, c: 0, wantMiddle: 0},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := middle(tt.a, tt.b, tt.c)

			if tt.wantMiddle != got {
				t.Fatalf("want %d, got %d", tt.wantMiddle, got)
			}
		})
	}
}
