import { module, test } from 'qunit'
import { setupRenderingTest } from 'addition/tests/helpers'
import { render } from '@ember/test-helpers'
import { hbs } from 'ember-cli-htmlbars'

module('Integration | Component | toggle-reveal', function (hooks) {
  setupRenderingTest(hooks)

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<ToggleReveal />`)

    assert.dom().hasText('')

    // Template block usage:
    await render(hbs`
      <ToggleReveal>
        template block text
      </ToggleReveal>
    `)

    assert.dom().hasText('template block text')
  })
})
