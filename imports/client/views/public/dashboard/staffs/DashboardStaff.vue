<template>
    <page-container>
        <div class="font-title">Today Booking</div>
        <div class="row has-small-gutter">
            <div class="col-xs-fluid-12">
                <cards>
                    <router-link to="/dashboard/today-booking/badminton">
                        <cards-image img="/img/badminton.jpg" v-ripple>
                            <div class="font-subhead color-white no-margin font-medium" style="position: absolute; top: 0; left: 0; padding: 12px; z-index: 300">Badminton Court</div>
                        </cards-image>
                    </router-link>
                    <divider></divider>
                    <cards-action>
                        <div class="pull-right">
                            <router-link to="/dashboard/today-booking/badminton">
                                <icon-button name="arrow-right" class="primary" v-ripple></icon-button>
                            </router-link>
                        </div>
                    </cards-action>
                </cards>
            </div>
            <div class="col-xs-fluid-12">
                <cards>
                    <router-link to="/dashboard/today-booking/swimming">
                        <cards-image img="/img/pool.jpg" v-ripple>
                            <div class="font-subhead color-white no-margin font-medium" style="position: absolute; top: 0; left: 0; padding: 12px; z-index: 300">Swimming Pool</div>
                        </cards-image>
                    </router-link>
                    <divider></divider>
                    <cards-action>
                        <div class="pull-right">
                            <router-link to="/dashboard/today-booking/swimming">
                                <icon-button name="arrow-right" class="primary" v-ripple></icon-button>
                            </router-link>
                        </div>
                    </cards-action>
                </cards>
            </div>
            <div class="col-xs-fluid-12">
                <cards>
                    <router-link to="/dashboard/today-booking/netball">
                        <cards-image img="/img/netball.jpg" v-ripple>
                            <div class="font-subhead color-white no-margin font-medium" style="position: absolute; top: 0; left: 0; padding: 12px; z-index: 300">Netball Court</div>
                        </cards-image>
                    </router-link>
                    <divider></divider>
                    <cards-action>
                        <div class="pull-right">
                            <router-link to="/dashboard/today-booking/netball">
                                <icon-button name="arrow-right" class="primary" v-ripple></icon-button>
                            </router-link>
                        </div>
                    </cards-action>
                </cards>
            </div>
            <div class="col-xs-fluid-12">
                <cards>
                    <router-link to="/dashboard/today-booking/basketball">
                        <cards-image img="/img/basketball.jpg" v-ripple>
                            <div class="font-subhead color-white no-margin font-medium" style="position: absolute; top: 0; left: 0; padding: 12px; z-index: 300">Basketball Court</div>
                        </cards-image>
                    </router-link>
                    <divider></divider>
                    <cards-action>
                        <div class="pull-right">
                            <router-link to="/dashboard/today-booking/basketball">
                                <icon-button name="arrow-right" class="primary" v-ripple></icon-button>
                            </router-link>
                        </div>
                    </cards-action>
                </cards>
            </div>
            <div class="col-xs-fluid-12">
                <cards>
                    <router-link to="/dashboard/today-booking/futsal">
                        <cards-image img="/img/futsal.jpg" v-ripple>
                            <div class="font-subhead color-white no-margin font-medium" style="position: absolute; top: 0; left: 0; padding: 12px; z-index: 300">Futsal Court</div>
                        </cards-image>
                    </router-link>
                    <divider></divider>
                    <cards-action>
                        <div class="pull-right">
                            <router-link to="/dashboard/today-booking/futsal">
                                <icon-button name="arrow-right" class="primary" v-ripple></icon-button>
                            </router-link>
                        </div>
                    </cards-action>
                </cards>
            </div>
        </div>
    </page-container>
</template>
