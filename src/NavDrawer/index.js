import _ from 'lodash';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  EuiNavDrawer,
  EuiNavDrawerGroup,
} from '@elastic/eui';

import * as actions from './actions';

const TOKENIZER_COMPARE_URL = '?q=analysisReducer%7Cdefinition%7Canalyzer%7Cchar_filter%7Chtml_strip%7Cfilter%7Casciifolding%7Clowercase%7Cstop%7Ckstem%7Ctokenizer%7Cclassic%7Ckey%7C38c65df8-8d5d-43d4-b0d0-68d8557fb25c%7Cname%7CClassic%2BTokenizer%7Cwhitespace%7C8c369ab0-db84-4ba3-a6ac-547caedc5dbd%7CWhitespace%2BTokenizer%7Cstandard%7C9c81784e-fb20-448c-afe1-82f9df5667b5%7CStandard%2BTokenizer%7Cletter%7Cdb7e19b7-9c1e-4e7f-b84c-1b338c3a65d7%7CLetter%2BTokenizer%7C46f0093e-5d19-4ad6-9024-701cf1aa7f15%7CLowercase%2BTokenizer%7Cuax_url_email%7C5035ed61-2c56-4403-8cbd-04e80e0c5173%7CUAX%2BURL%2BEmail%2BTokenizer%7CsampletextReducer%7C%3Cp%3EThe%2Bquick%2Bbrown%2Bfox%2B(con%40fox.com)%2Bjumps%2Bover%2Bthe%2BJohn%27s%2Blazy%2Bdog%2B-%2Bquite%2Ba%2Bfeat...%2Bin%2Bfact%2C%2Ba%2Bspectacular%2Bfeat.%2B%2BFoxes%2Band%2Bdogs%2C%2Bgo%2Bfigure!%3C%2Fp%3E%7CtokenlistReducer%5E%5E%5E%240%7C%40%241%7C%242%7C-5%7C3%7C%404%5D%7C5%7C%406%7C7%7C8%7C9%5D%7CA%7CB%5D%7CC%7CD%7CE%7CF%5D%7C%241%7C%242%7C-5%7C3%7C%404%5D%7C5%7C%406%7C7%7C8%7C9%5D%7CA%7CG%5D%7CC%7CH%7CE%7CI%5D%7C%241%7C%242%7C-5%7C3%7C%404%5D%7C5%7C%406%7C7%7C8%7C9%5D%7CA%7CJ%5D%7CC%7CK%7CE%7CL%5D%7C%241%7C%242%7C-5%7C3%7C%404%5D%7C5%7C%406%7C7%7C8%7C9%5D%7CA%7CM%5D%7CC%7CN%7CE%7CO%5D%7C%241%7C%242%7C-5%7C3%7C%404%5D%7C5%7C%406%7C7%7C8%7C9%5D%7CA%7C7%5D%7CC%7CP%7CE%7CQ%5D%7C%241%7C%242%7C-5%7C3%7C%404%5D%7C5%7C%406%7C7%7C8%7C9%5D%7CA%7CR%5D%7CC%7CS%7CE%7CT%5D%5D%7CU%7CV%7CW%7C-3%5D';
const HTML_STRIP_COMPARE_URL = '?q=analysisReducer%7Cdefinition%7Ctokenizer%7Cstandard%7Cchar_filter%7Chtml_strip%7Cfilter%7Clowercase%7Ckey%7C08f5a3df-58b4-4569-a61b-1f92b4033142%7Cname%7CHTML%2BStrip%7CStandard%2BAnalyzer%7Canalyzer%7C00dadd44-de36-42fd-8dcc-2334bf7cc10a%7CsampletextReducer%7C%3Cp%3EThe%2Bquick%2Bbrown%2Bfox%2Bjumps%2Bover%2Bthe%2Blazy%2Bdog.%3C%2Fp%3E%7CtokenlistReducer%5E%5E%5E%240%7C%40%241%7C%242%7C3%7C4%7C%405%5D%7C6%7C%407%7C3%5D%5D%7C8%7C9%7CA%7CB%5D%7C%24A%7CC%7C1%7C%24D%7C3%5D%7C8%7CE%5D%5D%7CF%7CG%7CH%7C-3%5D';
const STEMMER_COMPARE_URL = '?q=analysisReducer%7Cdefinition%7Cchar_filter%7Chtml_strip%7Cfilter%7Casciifolding%7Clowercase%7Cstop%7Ctype%7Cstemmer%7Cname%7Cpossessive_english%7Ctokenizer%7Cstandard%7Ckey%7C3ca1ea95-e368-42a2-a032-88c4baaf0ac0%7CPossessive%2BEnglish%7Cminimal_english%7C9d9c27f0-87ab-43ae-b0c2-b1ad9c41e710%7CMinimal%2BEnglish%7Clight_english%7C73a4f7e6-fc33-49ca-8573-60fae6514db3%7CLight%2BEnglish%7Clovins%7C37531667-10f7-4474-9a54-79549ebe5ac5%7CLovins%7Cenglish%7C6f35463b-cc63-4db6-95ec-cc6cf7bdc0a9%7CEnglish%7Canalyzer%7Cporter_stem%7C7205b610-d385-4748-8f5b-d235a7f7f193%7CPorter%7Csnowball%7Cc14301b8-d78e-494a-8036-4246d8b6039e%7CSnowball%7Ckstem%7C4a2187ac-01b4-494c-88be-17fe231334f1%7CKstem%7CStandard%2BAnalyzer%7C55f862fd-9812-4633-a4cd-41156c95dc2d%7Cform%7CsampletextReducer%7C%3Cp%3ESamples%3A%2Bpayee%2C%2Brenewable%2B%26%2Brenewal%2C%2Bfox%2B%26%2Bfoxes%2C%2Brun%2B%26%2Brunning%2C%2Bjeff%27s%2Bwork%3C%2Fp%3E%7CtokenlistReducer%5E%5E%5E%240%7C%40%241%7C%242%7C%403%5D%7C4%7C%405%7C6%7C7%7C%248%7C9%7CA%7CB%5D%5D%7CC%7CD%5D%7CE%7CF%7CA%7CG%5D%7C%241%7C%242%7C%403%5D%7C4%7C%405%7C6%7C7%7C%248%7C9%7CA%7CH%5D%5D%7CC%7CD%5D%7CE%7CI%7CA%7CJ%5D%7C%241%7C%242%7C%403%5D%7C4%7C%405%7C6%7C7%7C%248%7C9%7CA%7CK%5D%5D%7CC%7CD%5D%7CE%7CL%7CA%7CM%5D%7C%241%7C%242%7C%403%5D%7C4%7C%405%7C6%7C7%7C%248%7C9%7CA%7CN%5D%5D%7CC%7CD%5D%7CE%7CO%7CA%7CP%5D%7C%241%7C%242%7C%403%5D%7C4%7C%405%7C6%7C7%7C%248%7C9%7CA%7CQ%5D%5D%7CC%7CD%5D%7CE%7CR%7CA%7CS%5D%7C%241%7C%24T%7C-5%7C2%7C%403%5D%7C4%7C%405%7C6%7C7%7CU%5D%7CC%7CD%5D%7CE%7CV%7CA%7CW%5D%7C%241%7C%24T%7C-5%7C2%7C%403%5D%7C4%7C%405%7C6%7C7%7CX%5D%7CC%7CD%5D%7CE%7CY%7CA%7CZ%5D%7C%241%7C%24T%7C-5%7C2%7C%403%5D%7C4%7C%405%7C6%7C7%7C10%5D%7CC%7CD%5D%7CE%7C11%7CA%7C12%5D%7C%24A%7C13%7C1%7C%24T%7CD%5D%7CE%7C14%5D%5D%7C15%7C%24%5D%7C16%7C17%7C18%7C-3%5D';

class NavDrawer extends React.Component {
  render() {
    const self = this;
    const { openFlyout, removeSavedItem, savedItems, showInfo, showTutorial } = this.props;
    const drawerOptions = _.compact([
      {
        label: 'About the App',
        iconType: 'help',
        onClick: showInfo,
      },
      {
        label: 'Quick Tutorial',
        iconType: 'videoPlayer',
        onClick: showTutorial,
      },
      !_.isEmpty(savedItems) && {
        label: 'Saved Items',
        iconType: 'reportingApp',
        id: 'saved-items-button',
        flyoutMenu: {
          title: 'Restore',
          listItems: _.map(savedItems, toSavedItemsMenuOption),
        },
      },
      {
        label: 'Demoes',
        iconType: 'globe',
        id: 'demoes-button',
        flyoutMenu: {
          title: 'Compare',
          listItems: [
            {
              label: 'Tokenizers',
              href: TOKENIZER_COMPARE_URL,
              iconType: 'grid',
            },
            {
              label: 'HTML Strip',
              href: HTML_STRIP_COMPARE_URL,
              iconType: 'cut',
            },
            {
              label: 'Stemmers',
              href: STEMMER_COMPARE_URL,
              iconType: 'cut',
            },
          ],
        },
      },
      {
        iconType: 'wrench',
        id: 'preferences-button',
        label: 'Preferences',
        onClick: showPreferences,
      },
      {
        label: 'Settings',
        iconType: 'gear',
        onClick: showSettings,
      },
    ]);

    return (
      <EuiNavDrawer ref={navRef => (this.navRef = navRef)}>
        <EuiNavDrawerGroup listItems={drawerOptions} />
      </EuiNavDrawer>
    );

    function showPreferences() {
      return openFlyout({
        content: 'Preferences',
        title: 'Preferences',
      });
    }

    function showSettings() {
      return openFlyout({
        content: 'Settings',
        title: 'Settings',
      });
    }

    function toSavedItemsMenuOption({ name, location }) {
      return {
        label: name,
        iconType: 'arrowRight',
        href: location,
        extraAction: {
          color: 'subdued',
          iconType: 'trash',
          onClick: _.over(
            removeSavedItem.bind(null, name),
            // hack to ensure that the flyout items update as items are removed
            function() {
              if(!self.navRef) return;
              const navFlyoutContent = _.get(self, 'navRef.state.navFlyoutContent');
              const updatedNavFlyoutContent = _.filter(navFlyoutContent, item => item.label !== name);
              return _.isEmpty(updatedNavFlyoutContent)
                ? self.navRef.collapseFlyout()
                : self.navRef.setState({ navFlyoutContent: updatedNavFlyoutContent });
            },
          ),
        }
      };
    }
  }
}

function mapStateToProps(state) {
  return {
    savedItems: _.orderBy(
      _.reduce(
        _.get(state, 'savedItems'),
        (acc, location, name) => _.concat(acc, { name, location}),
        []
      ),
      'name'
    ),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavDrawer);
