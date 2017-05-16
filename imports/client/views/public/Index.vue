<template>
    <div v-wheight="100" class="utm-background">
		<page-container style="height: 100%">
			<div class="row center-xs middle-xs" style="height: 100%">
				<div class="col-xs-fluid-24">
					<cards>
						<form @submit.prevent="login">
							<cards-content>
								<img src="/img/UTMSE.jpg" class="img-responsive">
								<textfield v-model="username" placeholder="Acid Username"></textfield>
								<textfield v-model="password" type="password" placeholder="Password"></textfield>
							</cards-content>
							<divider></divider>
							<cards-action>
								<div class="pull-right">
									<color-button class="utm-background-accent" type="submit" v-ripple><icon name="key"></icon> Sign In</color-button>
								</div>
							</cards-action>
						</form>
					</cards>
				</div>
			</div>
		</page-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				username: "",
				password: "",
			}
		},
		methods: {
			login() {
				if (!this.username) {
					return this.$snackbar.run("Please enter your ACID username", ()=> {}, "OK", "error")
				}

				if (!this.password) {
					return this.$snackbar.run("Please enter your ACID password", ()=> {}, "OK", "error");
				}

				Meteor.loginWithPassword(this.username, this.password, (err) => {
					if(err) {
						return this.$snackbar.run(err.reason, ()=> {}, "OK", "error");
					}

					this.$snackbar.run("Login Successfully");
					return this.$router.replace("/dashboard");
				})
			}
		}
	}
</script>