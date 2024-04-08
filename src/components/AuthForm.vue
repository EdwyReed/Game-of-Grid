<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
        <v-card class="pa-4" width="100%" max-width="400px" mx-auto>
          <v-form v-model="isValid" @submit.prevent="submitForm">
            <v-text-field
              label="Email"
              v-model="v$.email.$model"
              :error-messages="emailErrors"
              outlined
              dense
              @input="v$.email.$touch()"
              @blur="v$.email.$touch()"
            ></v-text-field>

            <v-text-field
              label="Password"
              type="password"
              v-model="v$.password.$model"
              :error-messages="passwordErrors"
              outlined
              dense
              @input="v$.password.$touch()"
              @blur="v$.password.$touch()"
            ></v-text-field>

            <v-row class="my-2" justify="center" align="center">
              <v-btn type="submit" :disabled="!isValid" color="primary">
                Login
              </v-btn>
            </v-row>
          </v-form>
        </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import {reactive, computed, ref} from 'vue'
import {useVuelidate} from '@vuelidate/core'
import {required, minLength, email} from '@vuelidate/validators'
import {useRouter} from "vue-router";

const router = useRouter()

interface FormState {
  email: string;
  password: string;
}

const form = reactive<FormState>({
  email: '',
  password: '',
})

const rules = {
  email: {required, email},
  password: {required, minLength: minLength(6)},
};

const isValid = ref(false)

const v$ = useVuelidate(rules, form)

const submitForm = () => {
  v$.value.$touch()
  if (!v$.value.$error) {
    router.push('/game')
  }
}

const emailErrors = computed(() => {
  return v$.value.email.$errors[0]?.$message
})

const passwordErrors = computed(() => {
  return v$.value.password.$errors[0]?.$message
})
</script>
