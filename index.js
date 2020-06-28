//discord.js library
const Discord = require("discord.js");
//Used to fetch info off the api for the server stats
const fetch = require("node-fetch");
//Personal developer use to restart and stop the bot
const exec = require('child_process').exec;
//Clears the console before logging into it
const clear = require("clear-console");
//Indents a string (used in the steam command)
const { stripIndents } = require("common-tags");
//Formats a date (used in steam command)
const dateFormat = require("dateformat");
const { inspect } = require("util");
const { getName } = require("country-list");
//The bot's token to login to Discord
var TOKEN = "NjY1NzcwMDc1NjE3NDkzMDIy.Xhqczg.AX1HWyPssiOTAMk7fUir6cChLoM";
//Change the prefix here
var PREFIX = "$";
//GIF Emote imitating a loading symbol for convenience
var loadingEmote = "<a:loading:652730102584442891>";
//Create a new Discord Client and define it to "bot"
var bot = new Discord.Client();
//Create a collection attached to the bot named "players" (used in the bot's activity status)
bot.players = new Discord.Collection();
bot.resp = new Discord.Collection();
//AWP Bhop map list with screenshots
var AWPMaps = {
    awp_lego_2018_wp: "https://i.imgur.com/a9dHgm1.jpg",
    awp_lego_2_wp: "https://public.pp.ua/wp-content/uploads/2018/10/awp_lego_2.png",
    awp_map_wp: "https://i.imgur.com/Yf8Swep.jpg",
    awp_india_wp: "https://www.nextlevelgamer.com/fpsgod-media/awpindia.jpg",
    awp_crashz_bandicoot_wp: "https://i.imgur.com/laX8jVZ.jpg",
    awp_crashz_dust_wp: "https://i.imgur.com/yTxoGEy.jpg",
    awp_dustylong_wp: "https://files.gamebanana.com/img/ss/maps/55a127dc8428d.jpg",
    awp_dust_wp: "https://i.imgur.com/Rt0zYWm.jpg",
    awp_garden_wp: "https://i.imgur.com/LS2VPl9.jpg",
    awp_highrated_wp: "https://i.imgur.com/PERKmPP.jpg",
    awp_minecraft_desert_wp: "https://steamuserimages-a.akamaihd.net/ugc/787481900793492521/B769466317F9F729FCBAA9FE326E27C8970CDD0C/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
    awp_orangeline_wp: "https://files.gamebanana.com/img/ss/maps/55988e3bcea52.jpg",
    awp_pro_wp: "https://i.imgur.com/REJ23l9.jpg",
    awp_zigzag_wp: "https://i.imgur.com/82cyg33.jpg",
    awp_server_wp: "https://i.imgur.com/8PoZZx5.jpg",
    awp_synthwave_wp: "https://steamuserimages-a.akamaihd.net/ugc/776241200629733872/C44AEF4D94B332ECCEAA12E663BD70BFB884152B/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
};
//Easy Bhop's maps' tier list
var tierList = {
    aimtraindriving_wp: "3",
    ar_baggage_wp: "3",
    ar_monastery_wp: "3",
    bhop_0_wp: "2",
    bhop_1: "1",
    bhop_15m_wp: "3",
    bhop_1derland_wp: "1",
    bhop_1n5an3: "1",
    bhop_1n5an3_csgo_wp: "1",
    bhop_1n5an3_wp: "1",
    bhop_1_wp: "3",
    bhop_2001_blue_aux_wp: "1",
    bhop_24hrs: "1",
    bhop_24hrs_wp: "2",
    bhop_24_wp: "3",
    bhop_2flocci2furious_csgo_wp: "4",
    bhop_2work_csgo_wp: "3",
    bhop_2work_wp: "3",
    bhop_3d_csgo_b1_wp: "2",
    bhop_3d_csgo_lg_wp: "3",
    bhop_3d_csgo_wp: "2",
    bhop_406_wp: "1",
    bhop_407_wp: "1",
    bhop_408_wp: "1",
    bhop_4four_wp: "3",
    bhop_4nairda_rg1_wp: "3",
    bhop_4u_wp: "1",
    bhop_50_shades_of_tissue_wp: "3",
    bhop_98sync_wp: "1",
    bhop_aamu_rg1_wp: "3",
    bhop_abandoned_sr_wp: "1",
    bhop_abandoned_wp: "1",
    bhop_abstraction_wp: "2",
    bhop_adam_wp: "1",
    bhop_addict_v2_csgo_wp: "3",
    bhop_adventures_csgo_lg_wp: "1",
    bhop_adventures_csgo_wp: "2",
    bhop_adventure_2_wp: "3",
    bhop_aegis_fix_rg1_wp: "3",
    bhop_aeria_final_wp: "1",
    bhop_agu_final_csgo_wp: "3",
    bhop_aimers_hell_wp: "5",
    bhop_aks_wp: "2",
    bhop_alba_wp: "4",
    bhop_alekant_wp: "3",
    bhop_alien_ruins_wp: "2",
    bhop_alley_csgo_wp: "1",
    bhop_alley_rg1_wp: "1",
    bhop_all_the_way_wp: "2",
    bhop_alone_wp: "3",
    bhop_alpha_fix_lg_wp: "3",
    bhop_alpha_fix_wp: "3",
    bhop_alt_jestas_wp: "1",
    bhop_alt_paskin_wp: "3",
    bhop_alt_saimaa_wp: "2",
    bhop_alt_terassi_wp: "1",
    bhop_alt_vaahtera_wp: "3",
    bhop_alvo2_wp: "5",
    bhop_alvo_wp: "5",
    bhop_alwaystranslucent_wp: "1",
    bhop_ambience_wp: "1",
    bhop_ametisti_wp: "2",
    bhop_amor_wp: "1",
    bhop_ancient_wp: "3",
    bhop_andromeda_go_csgo_wp: "3",
    bhop_andromeda_wp: "3",
    bhop_angkor_rg2_wp: "3",
    bhop_another20secstrafemap_wp: "1",
    bhop_anotherdevmap_wp: "3",
    bhop_anxiety_wp: "3",
    bhop_anyyy_wp: "1",
    bhop_aow_2easy_wp: "1",
    bhop_apathy_wp: "2",
    bhop_apricity_rg1_wp: "3",
    bhop_aquatic_wp: "2",
    bhop_arcane2_a06_csgo_wp: "3",
    bhop_arcane_b2_rg3_csgo_wp: "3",
    bhop_arcane_csgo_fix_lg_wp: "3",
    bhop_arcane_csgo_wp: "3",
    bhop_areal_wp: "1",
    bhop_areaportal_v1_lg_wp: "3",
    bhop_areaportal_v1_wp: "4",
    bhop_aroma_wp: "1",
    bhop_asiimov_wp: "2",
    bhop_astara_csgo_wp: "3",
    bhop_as_hard_as_long_csgo_lg_wp: "1",
    bhop_as_hard_as_long_csgo_wp: "3",
    bhop_as_hard_as_long_rg1_wp: "1",
    bhop_atom_wp: "1",
    bhop_atrium_wp: "1",
    bhop_at_night_csgo_fix_wp: "1",
    bhop_at_night_csgo_wp: "1",
    bhop_austere_csgo_wp: "3",
    bhop_autism_wp: "2",
    bhop_autobadges_csgo_b2_wp: "3",
    bhop_autobadges_csgo_fix_lg_wp: "3",
    bhop_autobadges_csgo_fix_wp: "3",
    bhop_auto_nato_v2_wp: "3",
    bhop_aux_a9_csgo_wp: "3",
    bhop_aux_csgo_lg_wp: "3",
    bhop_aux_csgo_wp: "5",
    bhop_awake_wp: "1",
    bhop_awful2c_csgo_wp: "3",
    bhop_awful3_rg1_wp: "3",
    bhop_aztec_csgo_lg_wp: "3",
    bhop_aztec_csgo_wp: "1",
    bhop_aztec_wp: "1",
    bhop_a_wp: "1",
    bhop_b2r_overpass_wp: "2",
    bhop_babes_csgo_bh_wp: "3",
    bhop_babes_csgo_wp: "1",
    bhop_babes_rg1_wp: "3",
    bhop_backstreet_wp: "3",
    bhop_badges_csgo_fix2_wp: "4",
    bhop_badges_csgo_wp: "3",
    bhop_badges_fix_wp: "6",
    bhop_badges_mini_csgo_wp: "3",
    bhop_badges_mini_rg1_wp: "3",
    bhop_badges_wp: "4",
    bhop_beachparty_wp: "1",
    bhop_bedtime_wp: "1",
    bhop_beginner_canyon_wp: "1",
    bhop_beginner_castle_lg_wp: "1",
    bhop_beginner_castle_wp: "3",
    bhop_beginner_rarri_f_wp: "1",
    bhop_behomeby10_wp: "2",
    bhop_behomeby10_csgo_wp: "1",
    bhop_behomeby11_wp: "2",
    bhop_bestmap_wp: "1",
    bhop_biff_csgo_lg_wp: "3",
    bhop_biff_csgo_wp: "1",
    bhop_bigdink_speedrun_wp: "1",
    bhop_birogl_fly_wp: "3",
    "bhop_birthdays_kiss-shot_wp": "3",
    bhop_bitches_csgo_wp: "3",
    bhop_bitches_fix_csgo_rg2_lg_wp: "3",
    bhop_bitches_fix_csgo_rg2_wp: "3",
    bhop_bkz_goldbhop_csgo_rg3_wp: "3",
    bhop_blackrockshooter_csgo_b1_wp: "2",
    bhop_blackrockshooter_csgo_lg_wp: "3",
    bhop_blackshit_wp: "1",
    bhop_blankbody_wp: "2",
    bhop_blend_csgo_lg_wp: "3",
    bhop_blend_csgo_wp: "4",
    bhop_bless_csgo_lg_wp: "1",
    bhop_bless_csgo_wp: "1",
    bhop_bliss2_wp: "3",
    bhop_blockworld2_csgo_lg_wp: "3",
    bhop_blockworld2_csgo_wp: "3",
    bhop_bloc_wp: "2",
    bhop_bluemoon_wp: "2",
    bhop_bluerace_csgo_wp: "2",
    bhop_bluerace_wp: "3",
    bhop_blueshit_csgo_wp: "2",
    bhop_blue_abstract_wp: "3",
    bhop_blue_aux_csgo_wp: "1",
    bhop_blue_shade_wp: "2",
    bhop_boatylicious_csgo_lg_wp: "3",
    bhop_boatylicious_csgo_wp: "1",
    bhop_bobop_wp: "1",
    bhop_bob_v1_csgo_wp: "1",
    bhop_bob_v1_wp: "3",
    bhop_borders_csgo_wp: "1",
    bhop_brasilia_wp: "3",
    bhop_brax_csgo_wp: "3",
    bhop_breath_csgo_wp: "2",
    bhop_bridge_wp: "1",
    bhop_brodinski: "1",
    bhop_brodinski_wp: "2",
    bhop_bw_wp: "1",
    bhop_cad_mini1_wp: "3",
    bhop_carotte_wp: "2",
    bhop_cartooncastle_csgo_wp: "1",
    bhop_cartooncastle_wp: "1",
    bhop_cartoons_csgo_lg_wp: "3",
    bhop_cartoons_csgo_wp: "3",
    bhop_cartoons_rg3_wp: "3",
    bhop_cartoons_wp: "3",
    bhop_castlerg_wp: "2",
    bhop_castletown_csgo_wp: "1",
    bhop_castletown_wp: "1",
    bhop_cbble_csgo_wp: "1",
    bhop_cc_csgo_wp: "2",
    bhop_ceekay_wp: "3",
    bhop_ch4: "3",
    bhop_ch4_wp: "3",
    bhop_challenjour_wp: "4",
    bhop_chaser_wp: "1",
    bhop_cheesemania_wp: "3",
    bhop_chen_csgo_wp: "1",
    bhop_chen_rg1_wp: "3",
    bhop_cherry_wp: "3",
    bhop_chervona_wp: "2",
    bhop_choice_csgo_lg_wp: "2",
    bhop_choice_csgo_wp: "2",
    bhop_christmas_rg1_lg_wp: "2",
    bhop_christmas_wp: "2",
    bhop_citnez_wp: "3",
    bhop_clarity_csgo_wp: "3",
    bhop_classicrainbowaux_fix_wp: "1",
    bhop_classic_comp_v1_wp: "3",
    bhop_clove_wp: "2",
    bhop_clowntown_csgo_wp: "3",
    bhop_cobblestones_csgo_lg_wp: "1",
    bhop_cobblestones_csgo_wp: "1",
    bhop_cobblestone_5xl_csgo_wp: "3",
    bhop_cobblestone_wp: "2",
    bhop_collapse_wp: "3",
    bhop_colorblind_wp: "1",
    bhop_colorshit_v2_wp: "3",
    bhop_colors_wp: "3",
    bhop_colours_v3_1_wp: "3",
    bhop_colour_lr_v1_fix_wp: "3",
    bhop_colour_v1_wp: "3",
    bhop_coma_x_csgo_wp: "1",
    bhop_combice_csgo_lg_wp: "3",
    bhop_combice_csgo_wp: "1",
    bhop_comfort_dev1_csgo_wp: "2",
    bhop_comjump2_rg3_lg_wp: "3",
    bhop_communityjump_csgo_wp: "4",
    bhop_community_jump2_csgo_wp: "5",
    bhop_compact_city_v2_wp: "1",
    bhop_conquest_wp: "3",
    bhop_consolecake_wp: "3",
    bhop_continuity_wp: "3",
    bhop_corridor_csgo_lg_wp: "3",
    bhop_corrupt_wp: "3",
    bhop_cpm_wp: "2",
    bhop_cratesx3_csgo_wp: "3",
    bhop_craton_wp: "1",
    bhop_crystal_csgo_wp: "1",
    bhop_crystal_rg1_lg_wp: "3",
    bhop_cubelights_wp: "3",
    bhop_culture_rg1_wp: "3",
    bhop_cuteboys_csgo_wp: "3",
    bhop_cuteconcretes_wp: "1",
    bhop_cutekittenz2_wp: "5",
    bhop_cutekittenz_csgo_lg_wp: "3",
    bhop_cutekittenz_csgo_wp: "4",
    bhop_cw_journey_csgo_wp: "3",
    bhop_cyber_csgo_wp: "1",
    bhop_cyon_wp: "2",
    bhop_cyphisonia_wp: "1",
    bhop_cyx_jump_csgo_wp: "3",
    bhop_d00d_csgo_fix_wp: "2",
    bhop_damage_fix_wp: "3",
    bhop_dango_wp: "2",
    bhop_danmark_csgo_lg_wp: "3",
    bhop_danmark_csgo_wp: "2",
    bhop_danmark_rg1_wp: "3",
    bhop_darkink_csgo_wp: "3",
    bhop_darkink_wp: "1",
    bhop_darkness_csgo_wp: "1",
    bhop_darkness_rg1_wp: "1",
    bhop_darkness_wp: "1",
    bhop_deckbox_csgo_fix_wp: "1",
    bhop_deeper_wp: "3",
    bhop_degree_wp: "3",
    bhop_delusion_wp: "2",
    bhop_deppy_wp: "3",
    bhop_desolation_csgo_wp: "3",
    bhop_despair_wp: "2",
    bhop_despondent_wp: "1",
    bhop_destribution_wp: "4",
    bhop_detached_wp: "3",
    bhop_developed_csgo_lg_wp: "3",
    bhop_developed_csgo_wp: "3",
    bhop_dev_v1_csgo_wp: "3",
    bhop_dev_v1_lg_wp: "3",
    bhop_dezza_wp: "1",
    bhop_dimensions_wp: "4",
    bhop_dimix_csgo_lg_wp: "3",
    bhop_dimix_csgo_wp: "3",
    bhop_dim_wp: "3",
    bhop_dipl_wp: "1",
    bhop_diremaul_csgo_wp: "3",
    bhop_disco_wp: "3",
    bhop_disgustipated_csgo_wp: "2",
    bhop_dispute_csgo_wp: "3",
    bhop_distilled_wp: "2",
    bhop_ditch_csgo_lg_wp: "3",
    bhop_ditch_csgo_wp: "3",
    bhop_doh_csgo_wp: "2",
    bhop_domo23_csgo_wp: "3",
    bhop_dom_wp: "1",
    bhop_dots_csgo_wp: "1",
    bhop_downdowndown_fix_wp: "3",
    bhop_downdowndown_wp: "1",
    bhop_downtown_wp: "3",
    bhop_dragon_fix_wp: "5",
    bhop_dream2_csgofix_wp: "3",
    bhop_dream2_csgo_lg_wp: "3",
    bhop_dream2_wp: "3",
    bhop_dreamtour_csgo_lg_wp: "3",
    bhop_dreamtour_csgo_wp: "4",
    bhop_dreamtour_rg1_wp: "4",
    bhop_dream_csgo_wp: "1",
    bhop_dream_rg1_wp: "3",
    bhop_drip_wp: "3",
    bhop_dtt_florp_csgo_rg2_wp: "3",
    bhop_duality_csgo_wp: "1",
    bhop_duality_wp: "1",
    bhop_dull_rg1_wp: "3",
    bhop_dunk_csgo_wp: "3",
    bhop_dust_v2_b1_lg_wp: "3",
    bhop_dust_v2_b1_wp: "2",
    bhop_easybhop_v1_wp: "1",
    bhop_easyhop_cozyedition_csgo_lg_wp: "1",
    bhop_easyhop_cozyedition_csgo_wp: "1",
    bhop_easy_csgo_wp: "1",
    bhop_easy_ultrafix_wp: "3",
    bhop_eazy_4xl_csgo_lg_wp: "3",
    bhop_eazy_4xl_csgo_wp: "3",
    bhop_eazy_csgo_wp: "3",
    bhop_eazy_fix_wp: "1",
    bhop_eazy_v2_wp: "3",
    bhop_ebicstrafemap_wp: "1",
    bhop_ecodus_fix5_wp: "5",
    bhop_egyptiantemple_csgo_wp: "3",
    bhop_egyptian_balls_wp: "1",
    bhop_egyptian_pickle_wp: "1",
    bhop_egypt_csgo_wp: "1",
    bhop_egypt_wp: "1",
    bhop_elate_wp: "2",
    bhop_electric_rg1_wp: "3",
    bhop_elements_wp: "4",
    bhop_elpartido_csgo_wp: "3",
    bhop_emevaelx_2_wp: "3",
    bhop_empire_csgo_wp: "3",
    bhop_enjoi_csgo_wp: "1",
    bhop_enjoi_wp: "1",
    bhop_enter_the_colosseum_wp: "3",
    bhop_epiphany_csgo_wp: "3",
    bhop_epoch_wp: "3",
    bhop_eu_v2_csgo_wp: "2",
    bhop_exceptional_csgo_wp: "3",
    bhop_exodus_fix_wp: "4",
    bhop_exodus_wp: "4",
    bhop_exquisite_csgo_fix_wp: "3",
    bhop_ez_azizy_2_fix_wp: "3",
    bhop_facility_csgo_wp: "3",
    bhop_fakeit_v1_wp: "2",
    bhop_fantasy_speedrun_wp: "3",
    bhop_fast_csgo_wp: "1",
    bhop_fast_hop_csgo_wp: "1",
    bhop_fatol_wp: "1",
    bhop_fishey_v3_wp: "3",
    bhop_flamingo_wp: "1",
    bhop_flat_csgo_wp: "2",
    bhop_flavum_csgo_wp: "3",
    bhop_flavum_wp: "1",
    bhop_flipypuppies_wp: "1",
    bhop_flocci_wp: "4",
    bhop_flow_wp: "2",
    bhop_fluffy_panda_wp: "2",
    bhop_fluid_csgo_wp: "1",
    bhop_flyingcolors_csgo_wp: "1",
    bhop_flyingcolors_fix_wp: "3",
    bhop_fly_lovers_csgo_wp: "3",
    bhop_foggybon_wp: "2",
    bhop_fogos_wp: "1",
    bhop_fool_wp: "3",
    bhop_forest_2_wp: "3",
    bhop_forest_csgo_wp: "1",
    bhop_forest_trials_csgo_wp: "1",
    bhop_forest_wp: "1",
    bhop_foreverpcpie_csgo_wp: "3",
    bhop_forevertranslucent_wp: "2",
    bhop_forgotten_tomb_csgo_wp: "1",
    bhop_forstrafe2_wp: "2",
    bhop_fort_update_wp: "1",
    bhop_fps_max_sr_csgo_wp: "3",
    bhop_fps_max_sr_wp: "3",
    bhop_frankerz_csgo_wp: "2",
    bhop_freakin_csgo_wp: "4",
    bhop_freedompuppies_wp: "1",
    bhop_fresh_csgo_wp: "2",
    bhop_fresh_wp: "1",
    bhop_friendsjump_csgo_wp: "5",
    bhop_fronk_wp: "2",
    bhop_fruits2_wp: "5",
    bhop_fuckdream_wp: "1",
    bhop_fuckfear_csgo: "3",
    bhop_fuckfear_csgo_wp: "2",
    bhop_fuhria_wp: "3",
    bhop_fur: "1",
    bhop_fury_2_csgo_wp: "3",
    bhop_fury_csgo_wp: "3",
    bhop_fur_fix_csgo_wp: "4",
    bhop_fur_wp: "3",
    bhop_fy_wp: "1",
    bhop_galaxy_wp: "1",
    bhop_gateway_wp: "2",
    bhop_ggf_5xl_csgo_wp: "3",
    bhop_gismo_csgo_wp: "1",
    bhop_gismo_wp: "2",
    bhop_glassy_wp: "3",
    bhop_glocky_wp: "3",
    bhop_godlik3_wp: "2",
    bhop_godlike_fixx_wp: "3",
    bhop_gonnatry_csgo_wp: "1",
    bhop_good_wp: "3",
    bhop_gopro_rg1_wp: "5",
    bhop_gottagofast_csgo: "3",
    bhop_gottagofast_csgo_wp: "1",
    bhop_gottagofast_wp: "1",
    bhop_grapejuice_csgo_wp: "2",
    bhop_grassland_speedrun_wp: "1",
    bhop_grassyass_wp: "1",
    bhop_gravityfun_wp: "1",
    bhop_graypulse_v2_wp: "2",
    bhop_grayscale_csgo_wp: "1",
    bhop_grayshit_wp: "1",
    bhop_great_unknown_wp: "3",
    bhop_greenhouse_csgo_wp: "3",
    bhop_greenhouse_wp: "1",
    bhop_greenrace_csgo_wp: "2",
    bhop_greenshit: "3",
    bhop_greenshit_wp: "1",
    bhop_greentex_wp: "1",
    bhop_green_csgo_wp: "2",
    bhop_green_shade_wp: "3",
    bhop_gridust_final_csgo_wp: "1",
    bhop_grigio_wp: "1",
    bhop_haamu_puisto_wp: "2",
    bhop_haddock_csgo_wp: "3",
    bhop_haddock_wp: "3",
    bhop_hah_wp: "2",
    bhop_hamel_csgo_wp: "3",
    bhop_handsuplol_csgo_b2_wp: "3",
    bhop_harmony_rg1_wp: "3",
    bhop_hathor_csgo: "3",
    bhop_hathor_csgo_wp: "1",
    bhop_hatred_wp: "3",
    bhop_height_csgo_wp: "3",
    bhop_hellokitty_csgo_fix_wp: "3",
    bhop_hell_csgo_wp: "3",
    bhop_helvete_wp: "3",
    bhop_hexag0n_cool_wp: "1",
    bhop_hexag0n_csgo_wp: "1",
    bhop_highfly_csgo_wp: "1",
    bhop_hima_wp: "3",
    bhop_hood2_wp: "1",
    bhop_hood_wp: "1",
    bhop_hoover_fix_csgo_wp: "3",
    bhop_hopi_csgo_wp: "3",
    bhop_hopi_wp: "3",
    bhop_horseshit_1_csgo_wp: "1",
    bhop_horseshit_1_wp: "1",
    bhop_horseshit_2_rg1_wp: "1",
    bhop_horseshit_3_rg1_wp: "1",
    bhop_horseshit_4_csgo_wp: "1",
    bhop_horseshit_4_rg1_wp: "1",
    bhop_horseshit_4_wp: "1",
    bhop_horseshit_5_csgo_wp: "1",
    bhop_horseshit_5_wp: "3",
    bhop_horseshit_6_wp: "1",
    bhop_horseshit_7_wp: "3",
    bhop_horseshit_8_wp: "1",
    bhop_how_much_speed_do_you_need_wp: "1",
    bhop_huar2_wp: "3",
    bhop_huni_wp: "2",
    bhop_hyable_wp: "3",
    bhop_icebase_csgo_wp: "1",
    bhop_icebase_wp: "1",
    bhop_iconic: "3",
    bhop_iconic_wp: "2",
    bhop_icosa: "1",
    bhop_icosa_wp: "2",
    bhop_idfk_wp: "3",
    bhop_idiosyncrasy_csgo_fix_fix_wp: "3",
    bhop_ihanvitunpaskamappi_wp: "3",
    bhop_ihate_devmaps_csgo_wp: "3",
    bhop_impecible_csgo_wp: "3",
    bhop_impulse_csgo_wp: "2",
    bhop_indaun_wp: "1",
    bhop_infog_final_wp: "5",
    bhop_inmomentum_gfl_final_wp: "5",
    bhop_insanelyserz_csgo_wp: "4",
    bhop_insane_asylum_rg2_wp: "1",
    bhop_inta_wp: "3",
    bhop_interloper_wp: "4",
    bhop_internetclub_csgo_wp: "1",
    bhop_invldd_wp: "3",
    bhop_Isaiah_wp: "3",
    bhop_isomer_wp: "1",
    bhop_ivy_final_wp: "3",
    bhop_j4f_speedrun_csgo_wp: "1",
    bhop_japan_csgo_wp: "3",
    bhop_japan_wp: "2",
    bhop_jegg2_wp: "3",
    bhop_jegg_adventure_csgo_wp: "3",
    bhop_jolt_wp: "1",
    bhop_jumbojump_wp: "4",
    bhop_jump_academy_csgo_wp: "1",
    bhop_jungle3k_csgo_wp: "1",
    bhop_jungle3k_rg1_wp: "1",
    bhop_jx: "1",
    bhop_jx_csgo_wp: "1",
    bhop_jx_wp: "1",
    bhop_kaisa_wp: "3",
    bhop_kake_wp: "1",
    bhop_kanto_wp: "2",
    bhop_karmeleanisy_wp: "3",
    bhop_kek_wp: "1",
    bhop_kerpele_csgo_wp: "2",
    bhop_keythebae_wp: "1",
    bhop_khonsu_csgo_wp: "2",
    bhop_khufu_wp: "2",
    bhop_kiitovittu_wp: "1",
    bhop_kitum_wp: "1",
    bhop_kiwi_cwfx_csgo_wp: "1",
    bhop_kiwi_cwfx_wp: "2",
    bhop_klassno_wp: "1",
    bhop_klob_wp: "3",
    bhop_knox_csgo_wp: "3",
    bhop_kore: "1",
    bhop_kore_wp: "1",
    bhop_korqane_wp: "2",
    bhop_kuiva_wp: "2",
    bhop_kukliii_e_rock_csgo_wp: "3",
    bhop_kukliii_longstrafe_wp: "1",
    bhop_kyle_wp: "1",
    bhop_kyntoperkele_wp: "1",
    bhop_kz_benchmark_rg6_wp: "3",
    bhop_kz_chillhop_rg1_wp: "1",
    bhop_kz_chillhop_wp: "1",
    bhop_kz_essence_rg3_wp: "3",
    bhop_kz_ocean_wp: "1",
    bhop_kz_ravine_csgo_wp: "1",
    bhop_kz_volcano_wp: "1",
    bhop_kz_watertemple_wp: "2",
    bhop_lambda_csgo_wp: "3",
    bhop_lapster_final_wp: "3",
    bhop_larena_nodoors_csgo_wp: "2",
    bhop_larena_nodoors_wp: "3",
    bhop_layers_wp: "3",
    bhop_leet_bh_wp: "2",
    bhop_legion_wp: "3",
    bhop_legit_csgo_wp: "1",
    bhop_lego1_csgo_wp: "3",
    bhop_lego1_wp: "3",
    bhop_lego2_csgo_wp: "4",
    bhop_lego2_wp: "4",
    bhop_legoflix1_csgo_wp: "3",
    bhop_legoflix1_wp: "3",
    bhop_legomyego_csgo_wp: "1",
    bhop_legomyego_wp: "3",
    bhop_lego_csgo_wp: "1",
    bhop_lego_rnm_wp: "3",
    bhop_lego_wp: "1",
    bhop_lego_zig_csgo_wp: "3",
    bhop_leios_wp: "2",
    bhop_lermi: "3",
    bhop_lermi_wp: "3",
    bhop_lessthandirt_wp: "2",
    bhop_letour_csgo_wp: "3",
    bhop_levidinskie_wp: "3",
    bhop_Licityyoi_wp: "1",
    bhop_lj_cosmic_go_wp: "1",
    bhop_lm_csgo_wp: "1",
    bhop_lolauto_fix_wp: "5",
    bhop_look_wp: "2",
    bhop_lost_world_wp: "4",
    bhop_lowg_wp: "1",
    bhop_lucky_wp: "1",
    bhop_lunti_wp: "3",
    bhop_malabar2_v3_wp: "1",
    bhop_malabar3_v3_wp: "3",
    bhop_mampu_csgo_wp: "3",
    bhop_manpoo_csgo_wp: "1",
    bhop_manpoo_wp: "1",
    bhop_mapsuck: "1",
    bhop_mapsuck_wp: "1",
    bhop_masterspike_rg1_csgo_wp: "1",
    bhop_medium_v1_wp: "2",
    bhop_medusozoa_wp: "3",
    bhop_meiiko_csgo_wp: "3",
    bhop_meliodas_v1_wp: "5",
    bhop_merzy_wp: "3",
    bhop_midnight_wp: "4",
    bhop_miku_csgo_wp: "1",
    bhop_miles_wp: "1",
    bhop_militia_csgo_wp: "1",
    bhop_militia_v2_wp: "3",
    bhop_minecraft_csgo_wp: "3",
    bhop_minecraft_dario000_csgo_wp: "1",
    bhop_mine_csgo_wp: "3",
    bhop_mine_wp: "3",
    bhop_mirrorsedge_csgo_wp: "2",
    bhop_mist_3_rg1_wp: "3",
    bhop_mixanik_rg2_wp: "3",
    bhop_mixed_journeys_csgo_cm_wp: "3",
    bhop_mixed_journeys_csgo_wp: "2",
    bhop_mixtape_csgo_wp: "1",
    bhop_monotonous_wp: "2",
    bhop_monster_jam_csgo_wp: "3",
    bhop_mons_csgo_wp: "2",
    bhop_mons_wp: "3",
    bhop_moonlight_wp: "1",
    bhop_mountains_csgo_wp: "1",
    bhop_mp_stairs_hq_csgo_wp: "1",
    bhop_mp_stairs_hq_wp: "3",
    bhop_muchfast_csgo_fix_fix_wp: "3",
    bhop_muchfast_csgo_wp: "2",
    bhop_mukiology_wp: "1",
    bhop_mult_wp: "1",
    bhop_muni_wp: "1",
    bhop_nahuy_wp: "2",
    bhop_nameless_csgo_wp: "3",
    bhop_nameless_rg1_wp: "3",
    bhop_neonhop_csgo_wp: "2",
    bhop_neon_v2_csgo_wp: "3",
    bhop_nervosity_wp: "2",
    bhop_netflixv2_wp: "3",
    bhop_newga_wp: "3",
    bhop_nightinegypt_final_wp: "4",
    bhop_nightwatch_wp: "1",
    bhop_nila_csgo_wp: "3",
    bhop_nila_wp: "3",
    bhop_nill_wp: "3",
    bhop_nira_wp: "1",
    bhop_niver_wp: "3",
    bhop_noidea_csgo_wp: "2",
    bhop_noidea_wp: "2",
    bhop_noimagination_wp: "1",
    bhop_nona_wp: "1",
    bhop_non_wp: "3",
    bhop_noobhop_csgo_wp: "1",
    bhop_noodles_v2_wp: "1",
    bhop_not_eazy_csgo_wp: "3",
    bhop_nuclear_csgo_wp: "1",
    bhop_nuclear_wp: "1",
    bhop_nullity_fix_wp: "3",
    bhop_null_csgo_wp: "3",
    bhop_null_wp: "4",
    bhop_NuTakoe_wp: "3",
    "bhop_nx-speedrun_startmap_wp": "1",
    bhop_nyrobs_wp: "1",
    bhop_nyrox_csgo_wp: "3",
    bhop_ny_wp: "1",
    bhop_oath_wp: "3",
    bhop_ocd_csgo_wp: "1",
    bhop_ocd_v5_wp: "3",
    bhop_ocean_wp: "1",
    bhop_ogel_rg1_wp: "2",
    bhop_ohboy_wp: "3",
    bhop_omfgdoges_wp: "2",
    bhop_omn_csgo_wp: "3",
    bhop_onehunnidemoji_wp: "2",
    bhop_opl_wp: "2",
    bhop_optic_csgo_wp: "2",
    bhop_orgrimmar_wp: "2",
    bhop_osvetnik_v1_fix_wp: "2",
    bhop_outback_rg1_wp: "3",
    bhop_outback_wp: "3",
    bhop_overline_wp: "1",
    bhop_oxom_wp: "3",
    bhop_pafi_wp: "3",
    bhop_pahin_wp: "1",
    bhop_paisaweeaboo_wp: "3",
    bhop_pansexual_wp: "2",
    bhop_paperwork_csgo_wp: "2",
    bhop_paradigm_wp: "3",
    bhop_paradoxum: "3",
    bhop_paradoxum_wp: "2",
    bhop_peachrace_csgo_wp: "2",
    bhop_pepel_fix_full_wp: "3",
    bhop_persepillu_wp: "1",
    bhop_phobia_csgo_wp: "3",
    bhop_picnic_wp: "3",
    bhop_pillars_csgo_wp: "3",
    bhop_pims_cwfx_csgo_wp: "3",
    bhop_pims_cwfx_wp: "1",
    bhop_pinky_csgo_wp: "1",
    bhop_pj_beta1_csgo_b2_wp: "4",
    bhop_playboy_csgo_wp: "3",
    bhop_pologos_fix_csgo_wp: "3",
    bhop_popcornforadmin_fix_csgo_wp: "1",
    bhop_popcornforadmin_wp: "1",
    bhop_portal_prt1_wp: "3",
    bhop_powerbhop_wp: "1",
    bhop_pphanjju_cake_wp: "1",
    bhop_primal_wp: "2",
    bhop_princess_boobs_wp: "1",
    bhop_project_easy_wp: "2",
    bhop_prometheus_wp: "3",
    bhop_pro_bhopper_final_fix_wp: "3",
    bhop_pro_bhop_csgo_wp: "1",
    bhop_prux_fix_csgo_wp: "3",
    bhop_puf_csgo_wp: "2",
    bhop_pure_betafix_wp: "2",
    bhop_pyxkeria_csgofix_wp: "2",
    bhop_pyxkeria_csgo_wp: "1",
    bhop_qmpa_csgo_wp: "1",
    bhop_qportal_csgo_wp: "3",
    bhop_quep_rg1_wp: "3",
    bhop_quesin_wp: "3",
    bhop_qwerty_wp: "2",
    bhop_rabbit_csgo_wp: "1",
    bhop_racer_csgo_wp: "1",
    bhop_ragepoop_rev_csgo_wp: "1",
    bhop_randomeness_wp: "2",
    bhop_ravine_csgo_wp: "1",
    bhop_raw_csgo_wp: "3",
    bhop_rebirth_level_one_alpha_wp: "3",
    bhop_rebound_csgo_wp: "1",
    bhop_reding_rg1_wp: "3",
    bhop_redshit_wp: "1",
    bhop_redwood_v2_wp: "1",
    bhop_remnants_wp: "3",
    bhop_resonance_csgo_wp: "1",
    bhop_respectable_black_person_wp: "3",
    bhop_rez_v3_wp: "2",
    bhop_rikudo_wp: "3",
    bhop_rin_wp: "3",
    bhop_ripdream_wp: "2",
    bhop_rippcpie_wp: "3",
    bhop_rising_csgo_wp: "1",
    bhop_riverland_wp: "1",
    bhop_rockthevote3_wp: "5",
    bhop_rockthevote_wp: "3",
    bhop_rogiql_wp: "2",
    bhop_rollin_v1_csgo_wp: "2",
    bhop_rotebal2_go_wp: "4",
    bhop_royal_csgo_wp: "1",
    bhop_runbhopper_csgo: "3",
    bhop_runbhopper_csgo_wp: "1",
    bhop_runbhopper_v2_wp: "1",
    bhop_sacred_wp: "3",
    bhop_safehaven_wp: "2",
    bhop_sahara_csgo_wp: "3",
    bhop_sandals_wp: "3",
    bhop_sandtrap_wp: "3",
    bhop_sandyshores_rg1_wp: "1",
    bhop_saro_speedrun_v2_wp: "1",
    bhop_saspatoon_csgo_wp: "3",
    bhop_sativa: "1",
    bhop_sativa_wp: "2",
    bhop_sauvakavely_wp: "3",
    bhop_scape_wp: "1",
    bhop_screelee_fix_csgo_wp: "3",
    bhop_scrollcity_rg1_wp: "1",
    bhop_sdc01_d_wp: "3",
    bhop_second_csgo_wp: "3",
    bhop_seiz_csgo_wp: "2",
    bhop_serenity_wp: "3",
    bhop_series_one_wp: "3",
    bhop_serv_wp: "2",
    bhop_shades_csgo_wp: "3",
    bhop_shaft_wp: "2",
    bhop_shine_wp: "3",
    bhop_shitmap_csgo_wp: "3",
    bhop_shitper_wp: "4",
    bhop_shitstrafe_wp: "3",
    bhop_shoppingspree_wp: "3",
    bhop_shortshit_xerxes_wp: "1",
    bhop_shrubhop_csgo_wp: "1",
    bhop_sima_wp: "3",
    bhop_simple_v2_csgo_wp: "3",
    bhop_sina_csgo_wp: "3",
    bhop_sina_wp: "4",
    bhop_sketchy_csgo_wp: "1",
    bhop_skylook2_wp: "3",
    bhop_skylook_wp: "3",
    bhop_skyruins_wp: "1",
    bhop_skyscrapers_csgo_wp: "2",
    bhop_sleepless_csgo_wp: "1",
    bhop_sleepless_rg1_wp: "1",
    bhop_slide: "3",
    bhop_slide_wp: "3",
    bhop_slope_csgo_wp: "1",
    bhop_slope_v2_wp: "3",
    bhop_slope_wp: "1",
    bhop_smally_wp: "3",
    bhop_smth_wp: "1",
    bhop_smudge_csgo_wp: "3",
    bhop_smudge_wp: "1",
    bhop_sniff_sharpies_csgo_wp: "3",
    bhop_snowychristmas_go_wp: "1",
    bhop_snowy_csgo_wp: "3",
    bhop_soaatana_csgo_wp: "2",
    bhop_sobasic_wp: "3",
    bhop_soft_csgo: "3",
    bhop_soft_csgo_wp: "3",
    bhop_somehopez_wp: "3",
    bhop_sonic_lagoon_csgo_lg_wp: "3",
    bhop_sonni_v2_csgo_wp: "3",
    bhop_sourcejump_csgo_wp: "3",
    bhop_sourcejump_wp: "3",
    bhop_spacebar_warrior_csgo_wp: "1",
    bhop_spacefailure_wp: "3",
    bhop_space_csgo_wp: "2",
    bhop_space_wp: "3",
    bhop_speedart_wp: "1",
    bhop_speedbub2_final_wp: "2",
    bhop_speedrun_aztec_csgo_wp: "3",
    bhop_speedrun_stairs_wp: "3",
    bhop_speedrun_triangle_wp: "4",
    bhop_speedrun_valley_csgo_b2_wp: "3",
    bhop_speedrun_valley_csgo_wp: "3",
    bhop_spell_wp: "2",
    bhop_spiteful_wp: "3",
    bhop_splrez_csgo_wp: "3",
    bhop_spongebob_csgo_wp: "3",
    bhop_spring_chill_wp: "3",
    bhop_sqee_csgo_wp: "5",
    bhop_ssj: "3",
    bhop_ssj_wp: "1",
    bhop_stages3_wp: "1",
    bhop_stoneage_wp: "2",
    bhop_stonez_wp: "3",
    bhop_stone_wp: "1",
    bhop_strafel0rd_wp: "3",
    bhop_strafe_fix_rework_rg1_wp: "3",
    bhop_strafe_hm_wp: "1",
    bhop_strafe_m4chine_wp: "5",
    bhop_strafe_matans_csgo_wp: "1",
    bhop_strafe_oletimes_csgo_wp: "1",
    bhop_strafe_strafe_wp: "3",
    bhop_strafe_summer_rg1_wp: "3",
    bhop_strafe_syn_yk_wp: "1",
    bhop_strafe_winter_wp: "1",
    bhop_stref_amazon_wp: "1",
    bhop_stref_asleep_wp: "3",
    bhop_stref_cairo_wp: "1",
    bhop_stref_shanghai_wp: "3",
    bhop_stref_siberia_wp: "1",
    bhop_stref_wat_wp: "1",
    bhop_subsidence_csgo_wp: "3",
    bhop_subway_csgo_wp: "1",
    bhop_subway_wp: "1",
    bhop_suicidepls_wp: "2",
    bhop_sukablyad_wp: "3",
    bhop_superdooperhard_csgo_wp: "4",
    bhop_superdooperhard_speedrun_csgo_wp: "3",
    bhop_supermario_csgo_wp: "3",
    bhop_surf_qvo_v2_wp: "2",
    bhop_svenA_wp: "1",
    bhop_swag_final_v2_wp: "3",
    bhop_swepty_wp: "1",
    bhop_swik_b1_wp: "3",
    bhop_symphony_wp: "2",
    bhop_synthetic_wp: "5",
    bhop_szaq2_wp: "3",
    bhop_tachyonic_csgo_wp: "4",
    bhop_tachyonic_wp: "3",
    bhop_tangos4fags_wp: "1",
    bhop_tasku_csgo_b3_wp: "3",
    bhop_tasku_csgo_wp: "3",
    bhop_teftel_wp: "5",
    bhop_tehoputki_wp: "2",
    bhop_tentacion_wp: "1",
    bhop_tequila_rg1_wp: "3",
    bhop_terez_wp: "1",
    bhop_tesquo_csgo_lg_wp: "3",
    bhop_tesquo_csgo_wp: "3",
    bhop_tex_csgo_wp: "3",
    bhop_thc_csgo_wp: "3",
    bhop_thc_gold_rg1_wp: "3",
    bhop_thc_platinum_final_rg2_wp: "3",
    bhop_thetimeputintothismapwasnotworth_wp: "3",
    bhop_the_distance_wp: "3",
    bhop_timeshifter_2_wp: "3",
    bhop_timeshifter_wp: "3",
    bhop_together_wp: "2",
    bhop_topgay_wp: "2",
    bhop_torqwaz_wp: "2",
    bhop_trampislow_csgo_wp: "3",
    bhop_trampislow_wp: "5",
    bhop_tran_wp: "1",
    bhop_treehouse3: "1",
    bhop_treehouse3_wp: "3",
    bhop_treehouse4_wp: "3",
    bhop_treehouse_wp: "3",
    bhop_tree_wp: "1",
    bhop_trezza_wp: "3",
    bhop_trib_speedrun_wp: "1",
    bhop_trib_vanilla_wp: "3",
    bhop_trinity_wp: "2",
    bhop_tropic_csgo_wp: "2",
    bhop_tuna_v2_wp: "1",
    bhop_turhapaska_wp: "3",
    bhop_tyle2_wp: "4",
    bhop_tyle_wp: "3",
    bhop_tyrian_wp: "3",
    bhop_ulowflymap_wp: "3",
    bhop_ultra_wp: "3",
    bhop_uncolored_wp: "3",
    bhop_underground_crypt_csgo_wp: "3",
    bhop_unkn0wn_csgo_wp: "1",
    bhop_unkn0wn_wp: "2",
    bhop_unreality_wp: "3",
    bhop_unreal_speedrun_csgo_wp: "3",
    bhop_upupup_wp: "1",
    bhop_velstand_wp: "2",
    bhop_verisimilitude_wp: "3",
    bhop_vertex_fast_wp: "1",
    bhop_vjump_wp: "1",
    bhop_vse_vishe_vishe_i_vishe_wp: "4",
    bhop_vulcan_wp: "3",
    bhop_waifus2_csgo_wp: "2",
    bhop_waifus_csgo_wp: "1",
    bhop_walker_wp: "3",
    bhop_waterfall_wp: "3",
    bhop_wave_wp: "3",
    bhop_weeaboosavana_wp: "3",
    bhop_weird_rg1_wp: "2",
    bhop_whatislove_csgo_wp: "3",
    bhop_whiteshit_wp: "1",
    bhop_white_csgo_wp: "2",
    bhop_whoevenbhops_final_csgo: "3",
    bhop_whoevenbhops_final_csgo_wp: "3",
    bhop_wiggle_wp: "2",
    bhop_wildcard_wp: "3",
    bhop_winterland_wp: "3",
    bhop_winter_csgo_wp: "1",
    bhop_winter_wp: "1",
    bhop_woah_wp: "1",
    bhop_wob_yk_csgo_wp: "3",
    bhop_woodenxd_wp: "2",
    bhop_wood_notsowoodremake_csgo_wp: "3",
    bhop_worldwar_csgo_wp: "1",
    bhop_xana_csgo_wp: "3",
    bhop_xana_wp: "3",
    bhop_xcsource_wp: "1",
    bhop_xof_wp: "2",
    bhop_xyz_wp: "3",
    bhop_x_wp: "3",
    bhop_yousuckdick_fagget_csgo_wp: "1",
    bhop_y_wp: "2",
    bhop_zentic_wp: "1",
    bhop_zig_csgo_fix_wp: "3",
    bhop_zig_remake_csgo_b1_wp: "3",
    bhop_zig_wp: "3",
    bhop_zipfag_wp: "3",
    bhop_zjebananazwa_csgo: "1",
    bhop_zjebananazwa_csgo_wp: "1",
    bhop_ztk_egyptiancrypt_wp: "3",
    bhop_zunron_csgo_wp: "1",
    bhop_zunron_wp: "3",
    bhop_zygos_wp: "2",
    bhop_z_wp: "3",
    cs_backalley_wp: "3",
    cs_italy_wp: "3",
    de_aztec_se_wp: "3",
    de_cache_wp: "3",
    de_castle_wp: "3",
    de_cbble_wp: "3",
    de_dust2_se_wp: "3",
    de_dust2_wp: "3",
    de_dust_wp: "3",
    de_nuke_se_wp: "3",
    de_sugarcane_wp: "3",
    gd_sugarcane_wp: "3",
    mg_minecraft_course_JB_N1_wp: "3",
    surf_christmas_go_wp: "3",
    surf_lullaby_ksf_wp: "3",
    test_wp: "3",
    training1_wp: "3"
}; //Easy Bhop map list with screenshots
var BHOPMaps = {
    bhop_hatred_wp: "https://files.gamebanana.com/img/ss/maps/5963be3ed6fc0.jpg",
    bhop_forstrafe2_wp: "https://i.imgur.com/mirmcXq.png",
    bhop_emevaelx_2_wp: "https://i.imgur.com/J24umGa.png",
    bhop_1derland_wp: "https://files.gamebanana.com/img/ss/maps/56ddad1d52d29.jpg",
    bhop_1n5an3_wp: "https://i.imgur.com/9jrbVlw.jpg",
    bhop_24hrs_wp: "https://files.gamebanana.com/img/ss/maps/5b7cc73917412.jpg",
    bhop_3d_csgo_wp: "https://i.imgur.com/UeJJfBf.png",
    bhop_4four_wp: "https://files.gamebanana.com/img/ss/maps/5cf4bc37a448c.jpg",
    bhop_4u_wp: "https://files.gamebanana.com/img/ss/maps/5706a236689d4.jpg",
    bhop_50_shades_of_tissue_wp: "https://i.ytimg.com/vi/Ajvwlw08lpY/maxresdefault.jpg",
    bhop_98sync_wp: "https://i.ytimg.com/vi/yp3BhSPe7zM/maxresdefault.jpg",
    bhop_eazy_v2_wp: "https://i.imgur.com/Db0qhbS.png",
    bhop_flow_wp: "https://files.gamebanana.com/img/ss/maps/573d013446af5.jpg",
    bhop_badges_fix_wp: "https://i.imgur.com/c5ECG8s.jpg",
    bhop_christmas_wp: "https://i.imgur.com/L7u2weD.jpg",
    bhop_qwerty_wp: "https://files.gamebanana.com/img/ss/maps/57c09c51e56a0.jpg",
    bhop_beachparty_wp: "https://i.imgur.com/r8J6Cer.png",
    bhop_space_wp: "https://i.imgur.com/1NyTPGB.jpg",
    bhop_horseshit_4_wp: "https://i.imgur.com/KZ8UwTm.jpg",
    bhop_stoneage_wp: "https://i.imgur.com/2MinpEC.jpg",
    bhop_breath_csgo_wp: "https://files.gamebanana.com/img/ss/maps/530-90_57f7e2f347b2b.jpg",
    bhop_dezza_wp: "https://files.gamebanana.com/img/ss/maps/5998a453b1560.jpg",
    bhop_lm_csgo_wp: "https://files.gamebanana.com/img/ss/maps/530-90_57f315e718624.jpg",
    bhop_hexag0n_cool_wp: "https://i.imgur.com/OmgXNtA.png",
    bhop_colors_wp: "https://i.imgur.com/ygwqYj9.png",
    bhop_yousuckdick_fagget_csgo_wp: "https://i.imgur.com/aWHNi3y.png",
    bhop_zentic_wp: "https://files.gamebanana.com/img/ss/maps/57cba6871410d.jpg",
    bhop_greenhouse_wp: "https://i.imgur.com/KrTTHy5.png",
    bhop_icebase_wp: "https://steamuserimages-a.akamaihd.net/ugc/397801311270646070/061FA6F899A5015B21B74200850052D19B1C694D/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
    bhop_ametisti_wp: "https://files.gamebanana.com/img/ss/maps/530-90_5935cd12ac30c.jpg",
    bhop_noodles_v2_wp: "https://i.imgur.com/sCrLxz7.png",
    bhop_cyx_jump_csgo_wp: "https://i.imgur.com/rRMuvLB.png",
    bhop_nuclear_wp: "https://i.imgur.com/qAlBLCp.png",
    bhop_noobhop_csgo_wp: "https://i.imgur.com/n3iTjNP.png",
    bhop_alt_paskin_wp: "https://i.imgur.com/FGKYyhy.png",
    bhop_worldwar_csgo_wp: "https://i.imgur.com/xNmCDnr.png",
    bhop_grigio_wp: "https://files.gamebanana.com/img/ss/maps/58f8c0ed118ff.jpg",
    bhop_ebicstrafemap_wp: "https://i.imgur.com/pMwlLz3.png",
    bhop_playboy_csgo_wp: "https://files.gamebanana.com/img/ss/maps/530-90_520404d83a8bb.jpg",
    bhop_abstraction_wp: "https://i.imgur.com/IJEXMiF.png",
    bhop_areal_wp: "https://files.gamebanana.com/img/ss/maps/57ea459ddcb64.jpg",
    bhop_at_night_csgo_fix_wp: "https://steamuserimages-a.akamaihd.net/ugc/579025066737033633/EE2D6135EAE59DCE10965B6BA86615B18C64C18D/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
    bhop_despondent_wp: "https://files.gamebanana.com/img/ss/maps/54edf2eff105b.jpg",
    bhop_strafe_strafe_wp: "https://steamuserimages-a.akamaihd.net/ugc/608352205822074296/A25DF6BCE5FE52A1AFC957878B45374444919EFD/",
    bhop_easybhop_v1_wp: "https://i.imgur.com/FAoM2iQ.png",
    bhop_kz_volcano_wp: "https://i.imgur.com/E7zFdVO.png",
    bhop_another20secstrafemap_wp: "https://tsarvar.com/maps/csgo/bhop_another20secstrafemap/2.jpg",
    bhop_stref_amazon_wp: "https://i.ytimg.com/vi/bcaWsEDZBhw/maxresdefault.jpg",
    bhop_lessthandirt_wp: "https://files.gamebanana.com/img/ss/maps/57f3be81e0769.jpg",
    bhop_primal_wp: "https://files.gamebanana.com/img/ss/maps/56e94647c2d06.jpg",
    bhop_phobia_csgo_wp: "https://i.imgur.com/FLbnd9C.png",
    bhop_saro_speedrun_v2_wp: "https://files.gamebanana.com/img/ss/maps/57c36dec51889.jpg",
    bhop_khufu_wp: "https://i.imgur.com/p0uBekB.png",
    bhop_fy_wp: "https://files.gamebanana.com/img/ss/maps/5668bee332396.jpg",
    bhop_kukliii_longstrafe_wp: "https://steamuserimages-a.akamaihd.net/ugc/268349544308244026/B7D18ACBD9DBE9654C8FCA8F4E0E29D4746DD57B/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
    bhop_fresh_wp: "https://i.ytimg.com/vi/Mfo67QbuP8U/maxresdefault.jpg",
    bhop_deeper_wp: "https://steamuserimages-a.akamaihd.net/ugc/383162706808494861/BD88BDCAB86750F00792AEF20E174908349886D7/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
    bhop_vertex_fast_wp: "https://files.gamebanana.com/img/ss/maps/5804698a24e38.jpg",
    bhop_quep_rg1_wp: "https://i.imgur.com/2OoSzgN.png",
    bhop_egyptian_balls_wp: "https://files.gamebanana.com/img/ss/maps/56781a6fa209e.jpg",
    bhop_strafe_matans_csgo_wp: "https://files.gamebanana.com/img/ss/maps/530-90_58093e6d2c6b2.jpg",
    bhop_pepel_fix_full_wp: "https://i.ytimg.com/vi/lmxUs3v9pC0/maxresdefault.jpg",
    bhop_apathy_wp: "https://files.gamebanana.com/img/ss/maps/58a5b0fca282e.jpg",
    bhop_fuhria_wp: "https://i.ytimg.com/vi/MfOqNcnnjGo/maxresdefault.jpg",
    bhop_grassyass_wp: "https://files.gamebanana.com/img/ss/maps/560d9d72cf368.jpg",
    bhop_brax_csgo_wp: "https://i.imgur.com/3dJaoUQ.png",
    bhop_jungle3k_rg1_wp: "https://i.imgur.com/ppH8FLr.png",
    bhop_ambience_wp: "https://files.gamebanana.com/img/ss/maps/578bbe8b6bfde.jpg",
    bhop_sativa_wp: "https://i.imgur.com/wwetupH.png",
    bhop_fuckdream_wp: "https://files.gamebanana.com/img/ss/maps/593bc33ab9389.jpg",
    bhop_carotte_wp: "https://i.imgur.com/DClAJ6R.png",
    bhop_the_distance_wp: "https://files.gamebanana.com/img/ss/maps/530-90_53e8d1d8a56bd.jpg",
    bhop_backstreet_wp: "https://files.gamebanana.com/img/ss/maps/55b06239a7ae3.jpg",
    bhop_colorblind_wp: "https://files.gamebanana.com/img/ss/maps/593f3dd7885cf.jpg",
    bhop_y_wp: "https://files.gamebanana.com/img/ss/maps/530-90_5797bf7b8d303.jpg",
    bhop_helvete_wp: "https://files.gamebanana.com/img/ss/maps/5753306eea1e5.jpg",
    bhop_kiitovittu_wp: "https://i.imgur.com/6j3GiN5.jpg",
    bhop_icosa_wp: "https://files.gamebanana.com/img/ss/maps/56dc0853cfed2.jpg",
    bhop_lucky_wp: "https://files.gamebanana.com/img/ss/maps/56b07cc266b9c.jpg",
    bhop_flyingcolors_fix_wp: "https://files.gamebanana.com/img/ss/maps/5771c90cbec6a.jpg",
    bhop_greenshit_wp: "https://files.gamebanana.com/img/ss/maps/560d6dcc09bc1.jpg",
    bhop_all_the_way_wp: "https://i.ytimg.com/vi/2bcCy5SUpPs/maxresdefault.jpg",
    bhop_zunron_csgo_wp: "https://files.gamebanana.com/img/ss/maps/530-90_5708253605fc6.jpg",
    bhop_beginner_rarri_f_wp: "https://i.imgur.com/X225yTu.png",
    bhop_alone_wp: "https://files.gamebanana.com/img/ss/maps/59bef46262c19.jpg",
    bhop_shaft_wp: "https://i.imgur.com/LxoWnkT.png",
    bhop_medium_v1_wp: "https://steamuserimages-a.akamaihd.net/ugc/485641161517008127/B5859D361DFFAE93AB82177696A3C33C975FFAFD/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
    bhop_conquest_wp: "https://files.gamebanana.com/img/ss/maps/593ed181ce1f9.jpg",
    bhop_japan_wp: "https://steamuserimages-a.akamaihd.net/ugc/45377296710943834/7EDC6D84C8C27EA57F1BD2A7FE875BCA5BB17E72/",
    bhop_sandtrap_wp: "https://files.gamebanana.com/img/ss/maps/57f06b0b60765.jpg",
    bhop_speedrun_aztec_csgo_wp: "https://i.ytimg.com/vi/12udpVAT2Vo/maxresdefault.jpg",
    bhop_sukablyad_wp: "https://i.ytimg.com/vi/txkabUkJ5q4/maxresdefault.jpg",
    bhop_x_wp: "https://files.gamebanana.com/img/ss/maps/57194aceb9130.jpg",
    bhop_minecraft_dario000_csgo_wp: "https://steamuserimages-a.akamaihd.net/ugc/258220159598527323/253F417B49DFFC50BBB56687A79B99BDFBD538DC/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
    bhop_waifus_csgo_wp: "https://files.gamebanana.com/img/ss/maps/57ddfdc03eaf8.jpg",
    bhop_korqane_wp: "https://steamuserimages-a.akamaihd.net/ugc/96098822760203295/C4FCB41B91F2D9E8D633C186E48B3CCD097474B0/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
    bhop_corrupt_wp: "https://files.gamebanana.com/img/ss/maps/564735bc6c8e4.jpg",
    bhop_hood2_wp: "https://i.imgur.com/RaBCEqo.jpg",
    bhop_spell_wp: "https://steamuserimages-a.akamaihd.net/ugc/203053761713868170/9CEEC68C5521CCBCFA3C41CA41B32E73439AC663/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
    bhop_dream2_wp: "https://files.gamebanana.com/img/ss/maps/55621edd0a74e.jpg",
    bhop_clove_wp: "https://files.gamebanana.com/img/ss/maps/57cb9dfd294f1.jpg",
    bhop_nightwatch_wp: "https://files.gamebanana.com/img/ss/maps/57984af8d8172.jpg"
        /*,
        	Add remaining maps here*/
};
var OnevOneMaps = {
    am_kristall_wp: "https://files.gamebanana.com/img/ss/maps/5c3dd7a99c0a7.jpg"
};
//Function to get the bot's uptime
function uptime() {
    let totalSeconds = (bot.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    var dayDays = "days";
    var hourHours = "hours";
    var minuteMinutes = "minutes";
    var secondSeconds = "seconds";
    if (days === 1) dayDays = "day";
    if (hours === 1) dayDays = "hour";
    if (minutes === 1) dayDays = "minute";
    if (seconds === 1) dayDays = "second";
    return `${days} ${dayDays}, ${hours} ${hourHours}, ${minutes} ${minuteMinutes} and ${seconds.toFixed(2)} seconds`;
}
//Function to take a timestamp and convert it into a "seconds/minutes/hours ago" format (used in steam command)
function time2TimeAgo(ts) {
    var d = new Date();
    var nowTs = Math.floor(d.getTime() / 1000);
    var seconds = nowTs - ts;
    if (seconds > 31540000) {
        return "over a year ago";
    }
    if (seconds > 2628000) {
        var monthsMonth = " months ";
        if (Math.floor((seconds / 2628000)) < 2) {
            monthsMonth = " month ";
        }
        return Math.floor((seconds / 2628000)) + monthsMonth + "ago";
    }
    if (seconds > 2 * 24 * 3600) {
        var daysDay = " days ";
        if (Math.floor((seconds / 2 / 24 / 3600)) < 2) {
            daysDay = " day ";
        }
        return Math.floor((seconds / 2 / 24 / 3600)) + daysDay + "ago";
    }
    if (seconds > 24 * 3600) {
        return "yesterday";
    }
    if (seconds > 3600) {
        var hoursHour = " hours ";
        if (Math.floor((seconds / 3600)) < 2) {
            hoursHour = " hour ";
        }
        return Math.floor(seconds / 3600) + hoursHour + "ago";
    }
    if (seconds > 60) {
        var minutesMinute = " minutes ";
        if (Math.floor((seconds / 60)) < 2) {
            minutesMinute = " minute ";
        }
        return Math.floor(seconds / 60) + minutesMinute + "ago";
    }
    if (seconds < 60) {
        var secondsSecond = " seconds ";
        if (seconds < 2) {
            secondsSecond = " second ";
        }
        return (seconds) + secondsSecond + "ago";
    }
}
//Function to convert a timestamp into a date (used in the server stats)
function stamp2date(unixTimestamp) {
    var date = new Date(unixTimestamp * 1000);
    var hours = "0" + date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    return hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}
//Function to convert seconds into a timestamp (used in the server stats)
function sec2time(timeInSeconds) {
    var pad = function(num, size) { return ('000' + num).slice(size * -1); },
        time = parseFloat(timeInSeconds).toFixed(3),
        hours = Math.floor(time / 60 / 60),
        minutes = Math.floor(time / 60) % 60,
        seconds = Math.floor(time - minutes * 60);
    return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2);
}
//Function to get the value in odd indexes of an array (used in the players activity graph)
function getOdds(array) {
    var finalArray = [];
    var i = 0;
    for (i in array) {
        i++;
        if ((i - 1) % 2 != 0) {
            finalArray.push(array[i]);
        } else {
            continue;
        }
    }
    return finalArray;
}
//When bot is ready and logged in
bot.on("ready", () => {
    //Clears the console
    clear({ toStart: true });
    console.log("\nWP Bot ready");
    console.log("---------------------------");
    var ips = [
        "192.223.24.121:27014",
        "192.223.24.121:27016",
        "192.223.24.121:27015",
        "192.223.24.121:27017"
    ];
    var servers = [
        "1v1 Arena",
        "AWP Bhop",
        "Easy Bhop",
        "102 Tick Bhop"
    ];
    var index = 0;
    let botChannel = bot.channels.get("649118255017099283");
    var url = "http://api.gametracker.rs/demo/json/server_info/";
    //Gets the amount of players in the the Easy Bhop server
    fetch(url + ips[index]).then(res => res.json()).then(body => {
        if (body.apiError != 0) {
            botChannel.send(":x: **Couldn't reach " + servers[index] + ", please check if the server is down or contact cunt#4811 on Discord**");
            index++;
        }
        bot.players.set(servers[index], body.players + "/" + body.playersmax);
        //Sets the bot activity to "Playing on Easy Bhop (online_players/max_players)"
        bot.user.setActivity("on " + servers[index] + " (" + bot.players.get(servers[index]) + ")", { type: "PLAYING" });
    });
    fetch("https://webhook.site/token/a7efae70-b454-4a21-a6ce-8a6b5b1ab7f3/requests").then(res => res.json()).then(body => {
        bot.resp.set(1, body.data.length);
    });
    index++;
    fetch(url + ips[0]).then(res => res.json()).then(body => {
        bot.guilds.get("525100161345519626").channels.get("670750417822416946").setName(servers[1] + " (" + body.players + "/" + body.playersmax + ")");
    });
    fetch(url + ips[1]).then(res => res.json()).then(body => {
        bot.guilds.get("525100161345519626").channels.get("670750439142195211").setName(servers[0] + " (" + body.players + "/" + body.playersmax + ")");
    });
    fetch(url + ips[2]).then(res => res.json()).then(body => {
        bot.guilds.get("525100161345519626").channels.get("670750451817512996").setName(servers[2] + " (" + body.players + "/" + body.playersmax + ")");
    });
    //Every 10 seconds, do this
    setInterval(function() {
        //Gets the amount of players in the the AWP Bhop server
        fetch(url + ips[index]).then(res => res.json()).then(body => {
            if (body.apiError != 0) {
                return botChannel.send(":x: **Couldn't reach " + servers[index] + ", please check if the server is down or contact cunt#4811 on Discord**");
            }
            bot.players.set(servers[index], body.players + "/" + body.playersmax);
            //Sets the bot activity to "Playing on server_name (online_players/max_players)"
            bot.user.setActivity("on " + servers[index] + " (" + bot.players.get(servers[index]) + ")", { type: "PLAYING" });
        });
        index++;
        if (index > 3) index = 0;
        fetch("https://webhook.site/token/a7efae70-b454-4a21-a6ce-8a6b5b1ab7f3/requests").then(resQ => resQ.json()).then(body => {
            if (bot.resp.get(1) != body.data.length) {
                bot.resp.set(1, body.data.length);
                var lengthBody = body.data.length;
                body = body.data[lengthBody - 1];
                var bodyContent = JSON.parse(body.content);
                var uuid = body.uuid;
                var totalPackages = 0;
                bodyContent.packages.forEach(element => {
                    totalPackages += element.purchase_data.quantity;
                });
                var receipt = new Discord.RichEmbed()
                    .setTitle("<:wpgang:654179908716855331> **Donation Receipt** :receipt:")
                    .setAuthor("IGN: " + bodyContent.customer.ign + ", " + getName(bodyContent.customer.country))
                    .setDescription("Bought " + totalPackages + " package(s) for $" + bodyContent.payment.price + " " + bodyContent.payment.currency + " (Payment " + uuid + ")")
                    .setColor(0xAD2425);
                var number = 1;
                bodyContent.packages.forEach(element => {
                    receipt.addField(number + ".", element.purchase_data.quantity + " x " + element.name + " package");
                    number++;
                });
                receipt.setTimestamp();
                return bot.channels.get("669693936939565086").send(receipt);
            } else return;
        });
    }, 2500);
    setInterval(function() {
        fetch(url + ips[0]).then(res => res.json()).then(body => {
            bot.guilds.get("525100161345519626").channels.get("670750417822416946").setName(servers[1] + " (" + body.players + "/" + body.playersmax + ")");
        });
        fetch(url + ips[1]).then(res => res.json()).then(body => {
            bot.guilds.get("525100161345519626").channels.get("670750439142195211").setName(servers[0] + " (" + body.players + "/" + body.playersmax + ")");
        });
        fetch(url + ips[2]).then(res => res.json()).then(body => {
            bot.guilds.get("525100161345519626").channels.get("670750451817512996").setName(servers[2] + " (" + body.players + "/" + body.playersmax + ")");
        });
    }, ((1000) * 60) * 10);

    bot.channels.get("665768856278794245").setName("👥 Members: " + bot.guilds.get("525100161345519626").members.size);
});
bot.on("error", (err) => {
    return;
});
process.on("uncaughtException", (err) => {
    return;
});
process.on("unhandledRejection", (err) => {
    return;
});
bot.on("guildMemberAdd", (member) => {
    if (member.guild.id === "525100161345519626") member.guild.channels.get("665768856278794245").setName("👥 Members: " + member.guild.members.size);
});
bot.on("guildMemberRemove", (member) => {
    if (member.guild.id === "525100161345519626") member.guild.channels.get("665768856278794245").setName("👥 Members: " + member.guild.members.size);
});
//When the bot detects a message
bot.on("message", message => {
            if (message.isMentioned(bot.users.get("665770075617493022"))) return message.channel.send("My prefix is `" + PREFIX + "`");
            var args = message.content.slice(PREFIX.length).split(" ");
            if (!message.content.startsWith(PREFIX)) return;
            if (message.channel.id === "525100161345519629") {
                if (message.content.toLowerCase() == PREFIX + "sprk") return message.channel.send("!ban fried_fetus69 45");
            }
            if (message.author.id != "375485987893149696" && !message.member.hasPermission("MANAGE_MESSAGES")) {
                if (message.channel.id != "525165230326808637" && message.channel.id != "649118255017099283" && message.channel.id != "663454232497750016") return;
            }
            switch (args[0].toLowerCase()) {
                //Sends an embed containing the servers' IP adresses with direct-connect links
                case "ip":
                    var embed = new Discord.RichEmbed()
                        .setTitle("<:wpgang:654177867818860544> **WP Server IPs**")
                        .setColor(0xAD2425)
                        .addField("**1v1 Arena**", "192.223.24.121:27014\n**steam://connect/192.223.24.121:27014/**")
                        .addField("**Easy Bhop**", "192.223.24.121:27015\n**steam://connect/192.223.24.121:27015/**")
                        .addField("**AWP Bhop**", "192.223.24.121:27016\n**steam://connect/192.223.24.121:27016/**")
                        .addField("**102 Tick Bhop**", "192.223.24.121:27017\n**steam://connect/192.223.24.121:27017/**");
                    message.channel.send(embed);
                    break;
                    //Sends an embed containing the specified server's amount of players, the current map, its status and its player activity (for the last 24h)
                case "stats":
                case "status":
                    var statsEmbed = new Discord.RichEmbed()
                        .setTitle("<:wpgang:654177867818860544> **WP Server status | Help**")
                        .setColor(0xAD2425)
                        .setDescription(`**Status command accepted arguments**
				1v1 Arena: ${PREFIX}stats 1v1
				Easy Bhop: ${PREFIX}stats bhop, ${PREFIX}stats easybhop
				102 Tick Bhop: ${PREFIX}stats 102bhop
				AWP Bhop: ${PREFIX}stats awp, ${PREFIX}stats awpbhop`);
                    if (!args[1]) return message.channel.send(statsEmbed);
                    else {
                        var statuses = [
                            ":x: Offline",
                            ":white_check_mark: Online"
                        ];
                        var ts = Math.round(new Date().getTime() / 1000);
                        switch (args[1].toLowerCase()) {
                            case "awp":
                            case "awpbhop":
                                //Gets info about the AWP Bhop server
                                fetch("http://api.gametracker.rs/demo/json/server_info/192.223.24.121:27016").then(res => res.json()).then(body => {
                                    var players = [];
                                    var playerNames = [];
                                    if (body.players_list.length > 0) {
                                        players.push(body.players_list);
                                        players[0].forEach(player => {
                                            playerNames.push("- **" + player.player.name.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'") + "**, Score: " + player.player.score + ", Online: " + sec2time(player.player.time));
                                        });
                                    } else {
                                        playerNames.push("No players online");
                                    }
                                    if (body.status === 0) var offline = "\nlast online: " + stamp2date(body.last_online);
                                    else offline = "";
                                    var points = [];
                                    for (var i = 0; i != 48; i++) {
                                        points.push(body.players_day.split(":")[i]);
                                    }
                                    points.push(body.players_list.filter(p => p.player.is_bot != 1).length);
                                    //The "chart" object is used for the line graph
                                    var chart = {
                                        //Types of graphs are "line", "bar", "pie", etc.
                                        type: 'line',
                                        data: {
                                            //Displays the time that the amount of players was taken
                                            labels: [
                                                stamp2date(ts - (23 * 3600)) + "  ", stamp2date(ts - (22 * 3600)) + "  ", stamp2date(ts - (21 * 3600)) + "  ", stamp2date(ts - (20 * 3600)) + "  ", stamp2date(ts - (19 * 3600)) + "  ", stamp2date(ts - (18 * 3600)) + "  ", stamp2date(ts - (17 * 3600)) + "  ", stamp2date(ts - (16 * 3600)) + "  ", stamp2date(ts - (15 * 3600)) + "  ", stamp2date(ts - (14 * 3600)) + "  ", stamp2date(ts - (13 * 3600)) + "  ", stamp2date(ts - (12 * 3600)) + "  ", stamp2date(ts - (11 * 3600)) + "  ", stamp2date(ts - (10 * 3600)) + "  ", stamp2date(ts - (9 * 3600)) + "  ", stamp2date(ts - (8 * 3600)) + "  ", stamp2date(ts - (7 * 3600)) + "  ", stamp2date(ts - (6 * 3600)) + "  ", stamp2date(ts - (5 * 3600)) + "  ", stamp2date(ts - (4 * 3600)) + "  ", stamp2date(ts - (3 * 3600)) + "  ", stamp2date(ts - (2 * 3600)) + "  ", stamp2date(ts - (3600)) + "  ", "(Now) " + stamp2date(ts) + "  "
                                            ],
                                            datasets: [{
                                                //Change the legend's text
                                                label: 'Amount of online players',
                                                //Change the legend's color (can also be used in HEX code like 0xFFFFFF, I already set it to WP's theme)
                                                backgroundColor: 'darkRed',
                                                //If set to false, will display a line only. Otherwise, will display a moutain-like line (the bottom is filled with color)
                                                fill: false,
                                                //Change the line's color (can also be used in HEX code like 0xFFFFFF, I already set it to WP's theme)
                                                borderColor: 'darkRed',
                                                //Change the line's thickness
                                                borderWidth: 2,
                                                //Online players data
                                                data: getOdds(points),
                                            }, ],
                                        },
                                        options: {
                                            title: {
                                                //If set to true, will display a title above the line graph
                                                display: true,
                                                //Change the title's text
                                                text: 'Players Last 24h',
                                                //Change the title's color (can also be used in HEX code like 0xFFFFFF, I already set it to WP's theme)
                                                fontColor: 'darkRed',
                                                //Change the title's font size
                                                fontSize: 26,
                                            },
                                            legend: {
                                                //Where to display the legend
                                                position: 'bottom',
                                                //Change the legend's font size
                                                fontSize: 11,
                                            },
                                            plugins: {
                                                datalabels: {
                                                    //If set to true, will display labels on every point containing its value
                                                    display: false,
                                                },
                                            },
                                            pointLabels: {
                                                //Change the labels' text font size
                                                fontSize: 14,
                                            },
                                            scales: {
                                                xAxes: [{
                                                    scaleLabel: {
                                                        //If set to true, will display an X Axes title
                                                        display: true,
                                                        //Change the X Axes' title
                                                        labelString: 'Time'
                                                    },
                                                    ticks: {
                                                        fontSize: 11,
                                                    },
                                                }],
                                                yAxes: [{
                                                    scaleLabel: {
                                                        //If set to true, will display a Y Axes title
                                                        display: true,
                                                        //Change the Y Axes' title
                                                        labelString: 'Players'
                                                    }
                                                }],
                                            },
                                        },
                                    };
                                    //Creates the line graph with the "chart" object (stringified to JSON format)
                                    var url = "https://quickchart.io/chart?height=400&width=600&backgroundColor=rgba(23,26,33,0.5)&c=" + JSON.stringify(chart);
                                    var embedAWP = new Discord.RichEmbed()
                                        .setTitle("<:wpgang:654177867818860544> **WP Server status | AWP Bhop**")
                                        .setColor(0xAD2425)
                                        //Current map's screenshot
                                        .setThumbnail(AWPMaps[body.map])
                                        //Server status
                                        .addField("Status:", statuses[body.status] + offline, true)
                                        //Current map
                                        .addField("Map:", body.map, true)
                                        .addBlankField(true)
                                        //Time the stats were observed
                                        .addField("Time of observation:", stamp2date(body.last_refresh))
                                        //Current amount of player online
                                        .addField("Players:", body.players_list.filter(p => p.player.is_bot != 1).length + "/" + body.playersmax, true)
                                        //List of online players with their name, score and online time
                                        .addField("Online players:", playerNames.sort(function(a, b) { return b - a; }))
                                        //Server's IP address
                                        .setFooter("IP: 192.223.24.121:27016")
                                        //Displays the line graph
                                        .setImage(url.replace(/'/g, "%27").replace(/ /g, "%20"));
                                    message.channel.send(embedAWP);
                                });
                                break;
                            case "bhop":
                            case "easybhop":
                                //Gets info about the Easy Bhop server
                                fetch("http://api.gametracker.rs/demo/json/server_info/192.223.24.121:27015").then(res => res.json()).then(body => {
                                    var players = [];
                                    var playerNames = [];
                                    if (body.players_list.length > 2) {
                                        players.push(body.players_list.slice(1));
                                        players[0].forEach(player => {
                                            if (player.player.name === "!replay" || player.player.name.includes("BOT") || player.player.name === "GOTV") return;
                                            if (player.player.is_bot === 1) return;
                                            playerNames.push("- **" + player.player.name.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'") + "**, Online: " + sec2time(player.player.time));
                                        });
                                    } else {
                                        playerNames.push("No players online");
                                    }
                                    if (body.status === 0) var offline = "\nlast online: " + stamp2date(body.last_online);
                                    else offline = "";
                                    var points = [];
                                    for (var i = 0; i != 48; i++) {
                                        points.push(body.players_day.split(":")[i]);
                                    }
                                    points.push(body.players_list.filter(p => p.player.is_bot != 1).length);
                                    //The "chart" object is used for the line graph
                                    var chart = {
                                        //Types of graphs are "line", "bar", "pie", etc.
                                        type: 'line',
                                        data: {
                                            //Displays the time that the amount of players was taken
                                            labels: [
                                                stamp2date(ts - (23 * 3600)) + "  ", stamp2date(ts - (22 * 3600)) + "  ", stamp2date(ts - (21 * 3600)) + "  ", stamp2date(ts - (20 * 3600)) + "  ", stamp2date(ts - (19 * 3600)) + "  ", stamp2date(ts - (18 * 3600)) + "  ", stamp2date(ts - (17 * 3600)) + "  ", stamp2date(ts - (16 * 3600)) + "  ", stamp2date(ts - (15 * 3600)) + "  ", stamp2date(ts - (14 * 3600)) + "  ", stamp2date(ts - (13 * 3600)) + "  ", stamp2date(ts - (12 * 3600)) + "  ", stamp2date(ts - (11 * 3600)) + "  ", stamp2date(ts - (10 * 3600)) + "  ", stamp2date(ts - (9 * 3600)) + "  ", stamp2date(ts - (8 * 3600)) + "  ", stamp2date(ts - (7 * 3600)) + "  ", stamp2date(ts - (6 * 3600)) + "  ", stamp2date(ts - (5 * 3600)) + "  ", stamp2date(ts - (4 * 3600)) + "  ", stamp2date(ts - (3 * 3600)) + "  ", stamp2date(ts - (2 * 3600)) + "  ", stamp2date(ts - (3600)) + "  ", "(Now) " + stamp2date(ts) + "  "
                                            ],
                                            datasets: [{
                                                //Change the legend's text
                                                label: 'Amount of online players',
                                                //Change the legend's color (can also be used in HEX code like 0xFFFFFF, I already set it to WP's theme)
                                                backgroundColor: 'darkRed',
                                                //If set to false, will display a line only. Otherwise, will display a moutain-like line (the bottom is filled with color)
                                                fill: false,
                                                //Change the line's color (can also be used in HEX code like 0xFFFFFF, I already set it to WP's theme)
                                                borderColor: 'darkRed',
                                                //Change the line's thickness
                                                borderWidth: 2,
                                                //Online players data
                                                data: getOdds(points),
                                            }, ],
                                        },
                                        options: {
                                            title: {
                                                //If set to true, will display a title above the line graph
                                                display: true,
                                                //Change the title's text
                                                text: 'Players Last 24h',
                                                //Change the title's color (can also be used in HEX code like 0xFFFFFF, I already set it to WP's theme)
                                                fontColor: 'darkRed',
                                                //Change the title's font size
                                                fontSize: 26,
                                            },
                                            legend: {
                                                //Where to display the legend
                                                position: 'bottom',
                                                //Change the legend's font size
                                                fontSize: 11,
                                            },
                                            plugins: {
                                                datalabels: {
                                                    //If set to true, will display labels on every point containing its value
                                                    display: false,
                                                },
                                            },
                                            pointLabels: {
                                                //Change the labels' text font size
                                                fontSize: 14,
                                            },
                                            scales: {
                                                xAxes: [{
                                                    scaleLabel: {
                                                        //If set to true, will display an X Axes title
                                                        display: true,
                                                        //Change the X Axes' title
                                                        labelString: 'Time'
                                                    },
                                                    ticks: {
                                                        fontSize: 11,
                                                    },
                                                }],
                                                yAxes: [{
                                                    scaleLabel: {
                                                        //If set to true, will display a Y Axes title
                                                        display: true,
                                                        //Change the Y Axes' title
                                                        labelString: 'Players'
                                                    }
                                                }],
                                            },
                                        },
                                    };
                                    //Creates the line graph with the "chart" object (stringified to JSON format)
                                    var url = "https://quickchart.io/chart?height=400&width=600&backgroundColor=rgba(23,26,33,0.5)&c=" + JSON.stringify(chart);
                                    var embedBHOP = new Discord.RichEmbed()
                                        .setTitle("<:wpgang:654177867818860544> **WP Server status | Easy Bhop**")
                                        .setColor(0xAD2425)
                                        //Current map's screenshot
                                        .setThumbnail(BHOPMaps[body.map])
                                        //Server's status
                                        .addField("Status:", statuses[body.status] + offline, true)
                                        //Current map
                                        .addField("Map:", body.map + " (Tier " + tierList[body.map] + ")", true)
                                        .addBlankField(true)
                                        //Time the stats were observed
                                        .addField("Time of observation:", stamp2date(body.last_refresh))
                                        //Current amount of players online
                                        .addField("Players:", body.players_list.filter(p => p.player.is_bot != 1).length + "/" + body.playersmax, true)
                                        //List of online players with their name, score and online time
                                        .addField("Online players:", playerNames.sort(function(a, b) { return b.player.score - a.player.score; }))
                                        //Server's IP address
                                        .setFooter("IP: 192.223.24.121:27015")
                                        //Displays the line graph
                                        .setImage(url.replace(/'/g, "%27").replace(/ /g, "%20"));
                                    message.channel.send(embedBHOP);
                                });
                                break;
                            case "102bhop":
                                //Gets info about the 102 Tick Bhop server
                                fetch("http://api.gametracker.rs/demo/json/server_info/192.223.24.121:27017").then(res => res.json()).then(body => {
                                    var players = [];
                                    var playerNames = [];
                                    if (body.players_list.length - 2 > 0) {
                                        players.push(body.players_list);
                                        players[0].forEach(player => {
                                            if (player.player.name === "!replay" || player.player.name.includes("BOT") || player.player.name === "GOTV") return;
                                            if (player.player.is_bot === 1) return;
                                            playerNames.push("- **" + player.player.name.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'") + "**, Online: " + sec2time(player.player.time));
                                        });
                                    } else {
                                        playerNames.push("No players online");
                                    }
                                    if (body.status === 0) var offline = "\nlast online: " + stamp2date(body.last_online);
                                    else offline = "";
                                    var points = [];
                                    for (var i = 0; i != 48; i++) {
                                        points.push(body.players_day.split(":")[i]);
                                    }
                                    points.push(body.players_list.filter(p => p.player.is_bot != 1).length);
                                    //The "chart" object is used for the line graph
                                    var chart = {
                                        //Types of graphs are "line", "bar", "pie", etc.
                                        type: 'line',
                                        data: {
                                            //Displays the time that the amount of players was taken
                                            labels: [
                                                stamp2date(ts - (23 * 3600)) + "  ", stamp2date(ts - (22 * 3600)) + "  ", stamp2date(ts - (21 * 3600)) + "  ", stamp2date(ts - (20 * 3600)) + "  ", stamp2date(ts - (19 * 3600)) + "  ", stamp2date(ts - (18 * 3600)) + "  ", stamp2date(ts - (17 * 3600)) + "  ", stamp2date(ts - (16 * 3600)) + "  ", stamp2date(ts - (15 * 3600)) + "  ", stamp2date(ts - (14 * 3600)) + "  ", stamp2date(ts - (13 * 3600)) + "  ", stamp2date(ts - (12 * 3600)) + "  ", stamp2date(ts - (11 * 3600)) + "  ", stamp2date(ts - (10 * 3600)) + "  ", stamp2date(ts - (9 * 3600)) + "  ", stamp2date(ts - (8 * 3600)) + "  ", stamp2date(ts - (7 * 3600)) + "  ", stamp2date(ts - (6 * 3600)) + "  ", stamp2date(ts - (5 * 3600)) + "  ", stamp2date(ts - (4 * 3600)) + "  ", stamp2date(ts - (3 * 3600)) + "  ", stamp2date(ts - (2 * 3600)) + "  ", stamp2date(ts - (3600)) + "  ", "(Now) " + stamp2date(ts) + "  "
                                            ],
                                            datasets: [{
                                                //Change the legend's text
                                                label: 'Amount of online players',
                                                //Change the legend's color (can also be used in HEX code like 0xFFFFFF, I already set it to WP's theme)
                                                backgroundColor: 'darkRed',
                                                //If set to false, will display a line only. Otherwise, will display a moutain-like line (the bottom is filled with color)
                                                fill: false,
                                                //Change the line's color (can also be used in HEX code like 0xFFFFFF, I already set it to WP's theme)
                                                borderColor: 'darkRed',
                                                //Change the line's thickness
                                                borderWidth: 2,
                                                //Online players data
                                                data: getOdds(points),
                                            }, ],
                                        },
                                        options: {
                                            title: {
                                                //If set to true, will display a title above the line graph
                                                display: true,
                                                //Change the title's text
                                                text: 'Players Last 24h',
                                                //Change the title's color (can also be used in HEX code like 0xFFFFFF, I already set it to WP's theme)
                                                fontColor: 'darkRed',
                                                //Change the title's font size
                                                fontSize: 26,
                                            },
                                            legend: {
                                                //Where to display the legend
                                                position: 'bottom',
                                                //Change the legend's font size
                                                fontSize: 11,
                                            },
                                            plugins: {
                                                datalabels: {
                                                    //If set to true, will display labels on every point containing its value
                                                    display: false,
                                                },
                                            },
                                            pointLabels: {
                                                //Change the labels' text font size
                                                fontSize: 14,
                                            },
                                            scales: {
                                                xAxes: [{
                                                    scaleLabel: {
                                                        //If set to true, will display an X Axes title
                                                        display: true,
                                                        //Change the X Axes' title
                                                        labelString: 'Time'
                                                    },
                                                    ticks: {
                                                        fontSize: 11,
                                                    },
                                                }],
                                                yAxes: [{
                                                    scaleLabel: {
                                                        //If set to true, will display a Y Axes title
                                                        display: true,
                                                        //Change the Y Axes' title
                                                        labelString: 'Players'
                                                    }
                                                }],
                                            },
                                        },
                                    };
                                    //Creates the line graph with the "chart" object (stringified to JSON format)
                                    var url = "https://quickchart.io/chart?height=400&width=600&backgroundColor=rgba(23,26,33,0.5)&c=" + JSON.stringify(chart);
                                    var embedBhop = new Discord.RichEmbed()
                                        .setTitle("<:wpgang:654177867818860544> **WP Server status | 102 Tick Bhop**")
                                        .setColor(0xAD2425)
                                        //Current map's screenshot
                                        .setThumbnail(BHOPMaps[body.map])
                                        //Server status
                                        .addField("Status:", statuses[body.status] + offline, true)
                                        //Current map
                                        .addField("Map:", body.map + " (Tier " + tierList[body.map] + ")", true)
                                        .addBlankField(true)
                                        //Time the stats were observed
                                        .addField("Time of observation:", stamp2date(body.last_refresh))
                                        //Current amount of player online
                                        .addField("Players:", body.players_list.filter(p => p.player.is_bot != 1).length + "/" + body.playersmax, true)
                                        //List of online players with their name, score and online time
                                        .addField("Online players:", playerNames.sort(function(a, b) { return b.player.score - a.player.score; }))
                                        //Server's IP address
                                        .setFooter("IP: 192.223.24.121:27017")
                                        //Displays the line graph
                                        .setImage(url.replace(/'/g, "%27").replace(/ /g, "%20"));
                                    message.channel.send(embedBhop);
                                });
                                break;
                            case "1v1":
                                //Gets info about the 1v1 server
                                fetch("http://api.gametracker.rs/demo/json/server_info/192.223.24.121:27014").then(res => res.json()).then(body => {
                                    var players = [];
                                    var playerNames = [];
                                    if (body.players_list.length - 2 > 0) {
                                        players.push(body.players_list);
                                        players[0].forEach(player => {
                                            if (player.player.name === "!replay" || player.player.name.includes("BOT") || player.player.name === "GOTV" || player.player.name === "Max Players") return;
                                            if (player.player.is_bot === 1) return;
                                            playerNames.push("- **" + player.player.name.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'") + "**, Score: " + player.player.score + "**, Online: " + sec2time(player.player.time));
                                        });
                                    } else {
                                        playerNames.push("No players online");
                                    }
                                    if (body.status === 0) var offline = "\nlast online: " + stamp2date(body.last_online);
                                    else offline = "";
                                    var points = [];
                                    for (var i = 0; i != 48; i++) {
                                        points.push(body.players_day.split(":")[i]);
                                    }
                                    points.push(body.players_list.filter(p => p.player.is_bot != 1).length);
                                    //The "chart" object is used for the line graph
                                    var chart = {
                                        //Types of graphs are "line", "bar", "pie", etc.
                                        type: 'line',
                                        data: {
                                            //Displays the time that the amount of players was taken
                                            labels: [
                                                stamp2date(ts - (23 * 3600)) + "  ", stamp2date(ts - (22 * 3600)) + "  ", stamp2date(ts - (21 * 3600)) + "  ", stamp2date(ts - (20 * 3600)) + "  ", stamp2date(ts - (19 * 3600)) + "  ", stamp2date(ts - (18 * 3600)) + "  ", stamp2date(ts - (17 * 3600)) + "  ", stamp2date(ts - (16 * 3600)) + "  ", stamp2date(ts - (15 * 3600)) + "  ", stamp2date(ts - (14 * 3600)) + "  ", stamp2date(ts - (13 * 3600)) + "  ", stamp2date(ts - (12 * 3600)) + "  ", stamp2date(ts - (11 * 3600)) + "  ", stamp2date(ts - (10 * 3600)) + "  ", stamp2date(ts - (9 * 3600)) + "  ", stamp2date(ts - (8 * 3600)) + "  ", stamp2date(ts - (7 * 3600)) + "  ", stamp2date(ts - (6 * 3600)) + "  ", stamp2date(ts - (5 * 3600)) + "  ", stamp2date(ts - (4 * 3600)) + "  ", stamp2date(ts - (3 * 3600)) + "  ", stamp2date(ts - (2 * 3600)) + "  ", stamp2date(ts - (3600)) + "  ", "(Now) " + stamp2date(ts) + "  "
                                            ],
                                            datasets: [{
                                                //Change the legend's text
                                                label: 'Amount of online players',
                                                //Change the legend's color (can also be used in HEX code like 0xFFFFFF, I already set it to WP's theme)
                                                backgroundColor: 'darkRed',
                                                //If set to false, will display a line only. Otherwise, will display a moutain-like line (the bottom is filled with color)
                                                fill: false,
                                                //Change the line's color (can also be used in HEX code like 0xFFFFFF, I already set it to WP's theme)
                                                borderColor: 'darkRed',
                                                //Change the line's thickness
                                                borderWidth: 2,
                                                //Online players data
                                                data: getOdds(points),
                                            }, ],
                                        },
                                        options: {
                                            title: {
                                                //If set to true, will display a title above the line graph
                                                display: true,
                                                //Change the title's text
                                                text: 'Players Last 24h',
                                                //Change the title's color (can also be used in HEX code like 0xFFFFFF, I already set it to WP's theme)
                                                fontColor: 'darkRed',
                                                //Change the title's font size
                                                fontSize: 26,
                                            },
                                            legend: {
                                                //Where to display the legend
                                                position: 'bottom',
                                                //Change the legend's font size
                                                fontSize: 11,
                                            },
                                            plugins: {
                                                datalabels: {
                                                    //If set to true, will display labels on every point containing its value
                                                    display: false,
                                                },
                                            },
                                            pointLabels: {
                                                //Change the labels' text font size
                                                fontSize: 14,
                                            },
                                            scales: {
                                                xAxes: [{
                                                    scaleLabel: {
                                                        //If set to true, will display an X Axes title
                                                        display: true,
                                                        //Change the X Axes' title
                                                        labelString: 'Time'
                                                    },
                                                    ticks: {
                                                        fontSize: 11,
                                                    },
                                                }],
                                                yAxes: [{
                                                    scaleLabel: {
                                                        //If set to true, will display a Y Axes title
                                                        display: true,
                                                        //Change the Y Axes' title
                                                        labelString: 'Players'
                                                    }
                                                }],
                                            },
                                        },
                                    };
                                    //Creates the line graph with the "chart" object (stringified to JSON format)
                                    var url = "https://quickchart.io/chart?height=400&width=600&backgroundColor=rgba(23,26,33,0.5)&c=" + JSON.stringify(chart);
                                    var embedBhop = new Discord.RichEmbed()
                                        .setTitle("<:wpgang:654177867818860544> **WP Server status | 1v1 Arena**")
                                        .setColor(0xAD2425)
                                        //Current map's screenshot
                                        .setThumbnail(OnevOneMaps[body.map])
                                        //Server status
                                        .addField("Status:", statuses[body.status] + offline, true)
                                        //Current map
                                        .addField("Map:", body.map, true)
                                        .addBlankField(true)
                                        //Time the stats were observed
                                        .addField("Time of observation:", stamp2date(body.last_refresh))
                                        //Current amount of player online
                                        .addField("Players:", body.players_list.filter(p => p.player.is_bot != 1).length + "/" + body.playersmax, true)
                                        //List of online players with their name, score and online time
                                        .addField("Online players:", playerNames.sort(function(a, b) { return b.player.score - a.player.score; }))
                                        //Server's IP address
                                        .setFooter("IP: 192.223.24.121:27014")
                                        //Displays the line graph
                                        .setImage(url.replace(/'/g, "%27").replace(/ /g, "%20"));
                                    message.channel.send(embedBhop);
                                });
                                break;
                            case "help":
                            case "h":
                            case "?":
                                message.channel.send(statsEmbed);
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                    //Gets the specified user's steam profile info
                case "steam":
                    if (!args[1]) return message.channel.send("❌ **No valid Steam ID or account name was provided**");
                    const token = "5A740E20204841079F26F822451D7D1F";
                    const steamEmoji = "<:steam:612468246016163843>";
                    if (isNaN(args[1]) || args[1].includes("https://steamcommunity.com/id/")) {
                        if (args[1].includes("https://steamcommunity.com/id/")) {
                            var vanityUrl = args[1].substring(30, args[1].length);
                            var last = args[1].split("").pop()
                            if (last == "/") vanityUrl = vanityUrl.slice(0, -1);
                        } else vanityUrl = args.slice(1).join(" ");
                        const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${vanityUrl}`;
                        fetch(url).then(res => res.json()).then(body => {
                            if (body.response.success != 1) return message.channel.send("❌ **Invalid Steam profile or Steam API unreachable**");
                            const id = body.response.steamid;
                            const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${id}`;
                            const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${id}`;
                            const state = ["Offline", "Online", "Busy", "Away", "Snooze", "Looking to trade", "Looking to play"];
                            var recentGames = [];
                            var gameIDs = [];
                            var recents = [];
                            fetch(summaries).then(res => res.json()).then(body => {
                                if (!body.response) return message.channel.send("❌ **Invalid Steam profile or Steam API unreachable**");
                                var { personaname, avatarfull, realname, personastate, loccountrycode, locstatecode, profileurl, timecreated, gameextrainfo, gameid, lastlogoff, primaryclanid } = body.response.players[0];
                                var info = "";
                                if (gameextrainfo) {
                                    var playerAmount = [];
                                    fetch("https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=" + gameid).then(res => res.json()).then(body4 => {
                                        playerAmount.push(body4.response.player_count);
                                    }).then(() => {
                                        info = " (currently playing [" + gameextrainfo + "](https://store.steampowered.com/app/" + gameid + ") (total players: " + playerAmount[0] + "))"
                                    });
                                }
                                fetch(bans).then(res => res.json()).then(body => {
                                    if (!body.players) return message.channel.send("❌ **Invalid Steam profile or Steam API unreachable**");
                                    var { NumberOfVACBans, NumberOfGameBans } = body.players[0];
                                    fetch("http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=" + token + "&steamid=" + id).then(res => res.json()).then(body2 => {
                                        if (body2.response.total_count > 0) {
                                            for (var i = 0; i != body2.response.total_count; i++) {
                                                recentGames.push(body2.response.games[i].name);
                                            }
                                            for (var i = 0; i != body2.response.total_count; i++) {
                                                gameIDs.push(body2.response.games[i].appid);
                                            }
                                            for (var i = 0; i != body2.response.total_count; i++) {
                                                recents.push("[" + recentGames[i] + "](https://store.steampowered.com/app/" + gameIDs[i] + ")");
                                            }
                                        }
                                        if (state[personastate] === "Offline") {
                                            var utcSeconds = lastlogoff;
                                            var lastonline = time2TimeAgo(utcSeconds);
                                            state[personastate] += " (last online " + lastonline + ")"
                                        }
                                        fetch("http://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=" + token + "&steamid=" + id).then(res => res.json()).then(body3 => {
                                            var steamLvl = body3.response.player_level;
                                            if (primaryclanid) {
                                                var groupInfo = `\n**Primary group ID:** ${primaryclanid}`;
                                            } else {
                                                groupInfo = "";
                                            }
                                            if (locstatecode === undefined) locstatecode = "";
                                            else locstatecode = "(" + locstatecode + ")";
                                            var embed = new Discord.RichEmbed()
                                                .setTitle(steamEmoji + " **Steam profile | " + personaname + " | Level: " + steamLvl + "**")
                                                .setThumbnail(avatarfull)
                                                .setColor(0x0ADEE)
                                                .setDescription(stripIndents `**[Click here to access profile](${profileurl})**
                                        **Real Name:** ${realname || "Unknown"}
                                        **SteamID:** ${id}
                                        **Status:** ${state[personastate]} ${info}
                                        **Country:** ${loccountrycode ? loccountrycode : "Unknown"} :flag_${loccountrycode ? loccountrycode.toLowerCase() : "white"}: ${locstatecode}
                                        **Account Created:** ${dateFormat(timecreated * 1000, "d/mm/yyyy (h:MM:ss TT)")}
                                        **Bans:** VAC: ${NumberOfVACBans}, Game: ${NumberOfGameBans}
                                        **Recently played:** ${recents.join(", ")}${groupInfo}`)
                                                .setTimestamp();
                                            return message.channel.send(embed);
                                        });
                                    });
                                });
                            });
                        });
                    } else {
                        if (args[1].includes("https://steamcommunity.com/profiles/")) {
                            var steamID = args[1].substring(36, args[1].length);
                            if (args[1].endsWith("/")) steamID.substring(0, (args[1].length - 1));
                        } else steamID = args[1];
                        const idSummaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${steamID}`;
                        const idBans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${steamID}`;
                        const idState = ["Offline", "Online", "Busy", "Away", "Snooze", "Looking to trade", "Looking to play"];
                        var recentGames = [];
                        var gameIDs = [];
                        var recents = [];
                        fetch(idSummaries).then(res => res.json()).then(body => {
                            if (!body.response) return message.channel.send("❌ **Invalid Steam ID or Steam API unreachable**");
                            var { personaname, avatarfull, realname, personastate, loccountrycode, locstatecode, profileurl, timecreated, gameextrainfo, gameid, lastlogoff, primaryclanid } = body.response.players[0];
                            if (gameextrainfo) {
                                var info = " (currently playing [" + gameextrainfo + "](https://store.steampowered.com/app/" + gameid + "))"
                            } else {
                                info = "";
                            }
                            fetch(idBans).then(res => res.json()).then(body => {
                                if (!body.players) return message.channel.send("❌ **Invalid Steam ID or Steam API unreachable**");
                                var { NumberOfVACBans, NumberOfGameBans } = body.players[0];
                                fetch("http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=" + token + "&steamid=" + steamID).then(res => res.json()).then(body2 => {
                                    if (body2.response.total_count > 0) {
                                        for (var i = 0; i != body2.response.total_count; i++) {
                                            recentGames.push(body2.response.games[i].name);
                                        }
                                        for (var i = 0; i != body2.response.total_count; i++) {
                                            gameIDs.push(body2.response.games[i].appid);
                                        }
                                        for (var i = 0; i != body2.response.total_count; i++) {
                                            recents.push("[" + recentGames[i] + "](https://store.steampowered.com/app/" + gameIDs[i] + ")");
                                        }
                                    }
                                    if (idState[personastate] === "Offline") {
                                        var utcSeconds = lastlogoff;
                                        var lastonline = time2TimeAgo(utcSeconds);
                                        idState[personastate] += " (last online " + lastonline + ")"
                                    }
                                    if (primaryclanid) {
                                        var groupInfo = `\n**Primary group ID:** ${primaryclanid}`;
                                    } else {
                                        groupInfo = "";
                                    }
                                    if (locstatecode === undefined) locstatecode = "";
                                    else locstatecode = "(" + locstatecode + ")";
                                    fetch("http://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=" + token + "&steamid=" + args[1]).then(res => res.json()).then(body3 => {
                                        var steamLvl = body3.response.player_level;
                                        if (primaryclanid) {
                                            var groupInfo = `\n**Primary group ID:** ${primaryclanid}`;
                                        } else {
                                            groupInfo = "";
                                        }
                                        if (locstatecode === undefined) locstatecode = "";
                                        else locstatecode = "(" + locstatecode + ")";
                                        var embed = new Discord.RichEmbed()
                                            .setTitle(steamEmoji + " **Steam profile | " + personaname + " | Level: " + steamLvl + "**")
                                            .setThumbnail(avatarfull)
                                            .setColor(0x0ADEE)
                                            .setDescription(stripIndents `**[Click here to access profile](${profileurl})**
                                    **Real Name:** ${realname || "Unknown"}
                                    **SteamID:** ${args[1]}
                                    **Status:** ${idState[personastate]} ${info}
                                    **Country:** ${loccountrycode ? loccountrycode : "Unknown"} :flag_${loccountrycode ? loccountrycode.toLowerCase() : "white"}: ${locstatecode}
                                    **Account Created:** ${dateFormat(timecreated * 1000, "d/mm/yyyy (h:MM:ss TT)")}
                                    **Bans:** VAC: ${NumberOfVACBans}, Game: ${NumberOfGameBans}
                                    **Recently played:** ${recents.join(", ")}${groupInfo}`)
                                            .setTimestamp();
                                        return message.channel.send(embed);
                                    });
                                });
                            });
                        });
                    }
                    break;
                    //Gives the specified server's link to check a player's online time
                case "time":
                    if (!args[1]) return;
                    else {
                        if (args[1].toLowerCase() === "bhop") {
                            message.channel.send("http://www.wpgaming.network/bhoptime");
                        } else if (args[1].toLowerCase() === "awp") {
                            message.channel.send("http://www.wpgaming.network/awptime");
                        } else return;
                    }
                    break;
                case "avatar":
                case "av":
                    var mention = message.mentions.members.first();
                    if (!mention) var avatarUser = message.author;
                    else avatarUser = mention.user;
                    var embed = new Discord.RichEmbed()
                        .setImage(avatarUser.avatarURL)
                        .setColor(0xAD2425)
                        .setDescription("**[" + avatarUser.tag + "'s avatar](" + avatarUser.avatarURL + ")**")
                    message.channel.send(embed)
                    break;
                    //Sends an invite link to the WP Gang Discord server (in #rules)
                case "invite":
                    message.channel.send("https://discord.gg/9Dd8xbW");
                    break;
                    //Sends a link to the donations website
                case "donate":
                case "donations":
                    message.channel.send("https://donate.wpgaming.network/");
                    break;
                    //Sends a link to the forums website
                case "forums":
                    message.channel.send("http://www.wpgaming.network/forum/index.php");
                    break;
                    //hamburger
                case "hamburger":
                    message.channel.send(":hamburger:");
                    break;
                    //I've literally never seen this nigga in my life
                case "whothisnigga":
                    message.channel.send("I've literally never seen this nigga in my life");
                    break;
                    //Replies "Yikes." if someone tries the "nigger" command
                case "nigger":
                    message.reply("Yikes.");
                    break;
                case "dab":
                    message.channel.send("GET FUCKED NIGAAAAA");
                    break
                    //About the bot section (you can add your name if you ever edit anything)
                case "about":
                    message.channel.send(">>> **Made by:** cunt#4811 with discord.js library\n\n**Made for:** WP Gaming community - https://wpgaming.network/");
                    break;
                    //Help command that gives the bot's features (except non-useful ones such as hamburger and whothisnigga)
                case "commands":
                case "help":
                    message.channel.send(loadingEmote + " **Sending the commands list...**").then(loadingMessage => {
                        var embed = new Discord.RichEmbed()
                            .setTitle("<:wpgang:654177867818860544> **WP Gang Bot | Commands list**")
                            .setDescription("`" + PREFIX + "ip`, `" + PREFIX + "stats <awp/bhop>`, `" + PREFIX + "forums`,\n`" + PREFIX + "donate`, `" + PREFIX + "invite`, `" + PREFIX + "time <awp/bhop>`,\n`" + PREFIX + "steam <vanity url/steam ID/profile url>`, `" + PREFIX + "ping`, `" + PREFIX + "uptime`")
                            .setColor(0xAD2425);
                        //Sends the help embed to the author's DMs to avoid spam
                        message.author.send(embed).then(() => {
                            loadingMessage.edit(":white_check_mark: **Sent the commands list to your DMs**");
                        });
                    });
                    break;
                case "uptime":
                    message.channel.send(uptime());
                    break;
                case "ping":
                    message.channel.send(loadingEmote + " **Pinging...**").then((msg) => {
                        setTimeout(function() {
                            let ping = msg.createdTimestamp - message.createdTimestamp;
                            embed = new Discord.RichEmbed()
                                .setColor(0xAD2425)
                                .setDescription("⏱ Bot response time: **" + ping + "ms**\n\n💓 API latency: **" + Math.round(bot.ping) + "ms**")
                            msg.edit(embed);
                        }, 250);
                    }).catch((err) => {
                        console.log(err);
                    });
                    break
                default:
                    break;
            }
            //Developer-only commands
            if (message.author.id === "375485987893149696" || message.author.id === "294203339095277568" || message.author.id === "262182492763717633") {
                    switch (args[0].toLowerCase()) {
                        //Stops the bot
                        case "stopbot":
                        case "stopprocess":
                            message.channel.send(loadingEmote + " **Stopping process**").then(loadingMessage => {
                                loadingMessage.edit(":white_check_mark: **Destroyed current process**");
                                bot.destroy();
                            });
                            break;
                            //Restarts the bot (if changes are made in the source file and you're too lazy to open the console)
                        case "restartbot":
                        case "restartprocess":
                            message.channel.send(loadingEmote + " **Restarting process**").then(loadingMessage => {
                                exec('node .');
                                loadingMessage.edit(":white_check_mark: **Process restarted**");
                                bot.destroy();
                            });
                            break;
                            //Deletes a given amount of messages (between 1-100) that are 14 days old or less. If a message ID is given, will delete the specified message
                        case "clear":
                        case "delete":
                            message.delete().then(() => {
                                if (!args[1] || isNaN(args[1])) return;
                                if (args[1].length > 17 && args[1].length < 19) {
                                    message.channel.fetchMessages().then(messages => {
                                        messages.forEach(msg => {
                                            if (msg.id === args[1]) {
                                                return msg.delete();
                                            } else return;
                                        });
                                    });
                                }
                                if (args[1] < 1 || args[1] > 100) return;
                                message.channel.bulkDelete(args[1]);
                            });
                            break;
                        default:
                            break;
                    }
                }
                if (message.author.id != "375485987893149696" && message.author.tag != "cunt#4811") return;
                switch (args[0].toLowerCase()) {
                    case "eval":
                        var toEval = args.slice(1).join(" ");
                        if (toEval) {
                            try {
                                var evaluated = inspect(eval(toEval, { depth: 0 }));
                                var hrStart = process.hrtime();
                                var hrDiff;
                                hrDiff = process.hrtime(hrStart);
                                var evalEmbed = new Discord.RichEmbed()
                                    .setTitle("**Eval | Result**")
                                    .setColor(0xAD2425)
                                    .addField("**Evaluated command:**", toEval)
                                    .addField("**Response:**", evaluated.replace(/'/g, "").replace(TOKEN, "gtfo I'm not giving you my token"))
                                    .setFooter(`Executed in ${hrDiff[0] > 0 ? hrDiff[0] + "s." : ""}${hrDiff[1] / 1000000}ms.`);
                                message.channel.send(evalEmbed);
                            } catch (e) {
                                if (e.message === "RichEmbed field values may not exceed 1024 characters.") {
                                    var evaluated = inspect(eval(toEval, { depth: 0 }));
                                    var hrStart = process.hrtime();
                                    var hrDiff;
                                    hrDiff = process.hrtime(hrStart);
                                    return message.channel.send(`*Executed in ${hrDiff[0] > 0 ? hrDiff[0] + "s." : ""}${hrDiff[1] / 1000000}ms.*\n\`\`\`js\n${evaluated.substring(0, 1960).replace(TOKEN, "gtfo I'm not giving you my token")}\n...\n\`\`\``);
                                } else return message.channel.send(`Error evalutating "${toEval}"\n\`\`\`js\n${e.message}\n\`\`\``)
                            }
                        } else return;
                        break;
                    default:
                        break;
                }
            });
        //Login the bot to Discord with its token
        bot.login(TOKEN);