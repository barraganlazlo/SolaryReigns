var mathf = {

    lerp: function(amount, min, max) {
        return (1 - amount) * min + amount * max;
    },

    normalize: function(amount, min, max) {
        return this.clamp((amount - min) / (max - min), 0, 1);
    },
    clamp: function(value, min, max) {

        if (value < min) {
            return min;
        } else if (value > max) {
            return max;
        }

        return value;
    }
};