<template>
	<slot
    :errors="errors"
		:isInvalid="isInvalidField"
    :canShowError="canShowError"
		:isOnFocus="onFocus"
    :isEdited="isEdited"
    :handleBlur="handleBlur"
    :handleFocus="handleFocus"
	></slot>
</template>

<script>
	export default {
		name: "InputFieldValidator",
    emits: {
      'onchange-validation-state': null
    },
		props: {
      name: { type: String, default: '' },
			newValue: { type: String, required: true },
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
            case 'isEqual':
              return this.rules[ruleName] !== this.newValue ? errorObject[ruleName] = true : errorObject[ruleName] = false;
            case 'length':
              return this.rules[ruleName] !== this.newValue.length ? errorObject[ruleName] = true : errorObject[ruleName] = false;
          }
        });
        return errorObject;
      },
      canShowError() {
        return this.isInvalidField && this.isEdited && !this.onFocus;
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
    updated() {
      this.$emit('onchange-validation-state', { [this.name+'Error']: this.isInvalidField });
    }
	};
</script>
