<template>
	<slot
		name="field"
		:isInvalid="isInvalidField"
    :errors="errors"
		:isOnFocus="onFocus"
    :isEdited="isEdited"
    :handleBlur="handleBlur"
    :handleFocus="handleFocus"
	></slot>
</template>

<script>
	export default {
		name: "ValidateInput",
		props: {
			newValue: { type: [String, Number], required: true },
			rules: { type: Object, required: true },
		},
		data() {
			return {
				onFocus: false,
        isEdited: false,
			};
		},
    computed: {
      isInvalidField() {
        console.log(this.errors)
        return Object.values(this.errors).reduce( (prev, currentValue) => {
          return currentValue || prev;
        }, false);
      },
      errors() {
        const errorObject = {};
        Object.keys(this.rules).forEach( ruleName => {
          switch(ruleName) {
            case 'minLength':
              return this.newValue.length < this.rules[ruleName] ? errorObject[ruleName] = true : errorObject[ruleName] = false;

            case 'maxLength':
              return this.newValue.length > this.rules[ruleName] ? errorObject[ruleName] = true : errorObject[ruleName] = false;

            case 'regExp':
              return this.rules[ruleName].test(this.newValue) ? errorObject[ruleName] = false : errorObject[ruleName] = true;
          }
        });
        return errorObject;
      }
    },
		methods: {
			handleBlur() {
				this.isEdited = true;
        this.onFocus = false;
			},
			handleFocus() {
				this.onFocus = true;
			},
		},
	};
</script>

<style></style>
