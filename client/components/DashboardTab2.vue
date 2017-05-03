<template>
    <div style="padding: 16px;">
        <div class="row has-small-gutter">
            <div class="col-xs-fluid-12">
                <cards>
                    <router-link to="/dashboard/booking/badminton">
                        <cards-image img="/img/badminton.jpg" v-ripple></cards-image>
                    </router-link>
                    <divider></divider>
                    <cards-action>
                        <div class="pull-right">
                            <router-link to="/dashboard/booking/badminton">
                                <icon-button name="arrow-right" class="primary" v-ripple></icon-button>
                            </router-link>
                        </div>
                    </cards-action>
                </cards>
            </div>
            <div class="col-xs-fluid-12">
                <cards>
                    <router-link to="/dashboard/booking/swimming">
                        <cards-image img="/img/pool.jpg" v-ripple></cards-image>
                    </router-link>
                    <divider></divider>
                    <cards-action>
                        <div class="pull-right">
                            <router-link to="/dashboard/booking/swimming">
                                <icon-button name="arrow-right" class="primary" v-ripple></icon-button>
                            </router-link>
                        </div>
                    </cards-action>
                </cards>
            </div>
        </div>
    
        <!--<router-link to="/Badminton">
                                <img src="/img/bd.png" style="max-width:20%">
                                <raised-button class="primary && center" style="max-width:100%;">Badminton</raised-button>
                            </router-link>
                            <img src="/img/sw.png" style="max-width:20%">
                            <raised-button class="primary && center" style="max-width:100%;">Swimming Pool</raised-button>
                            <img src="/img/gm.png" style="max-width:20%">
                            <raised-button class="primary && center">Gym</raised-button>
                            <img src="/img/ft.png" style="max-width:20%">
                            <raised-button class="primary && center">Futsal</raised-button>-->
    </div>
</template>