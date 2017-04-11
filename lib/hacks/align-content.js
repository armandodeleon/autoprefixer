const flexSpec = require('./flex-spec');
const Declaration = require('../declaration');

class AlignContent extends Declaration {
    static initClass() {
        this.names = ['align-content', 'flex-line-pack'];

        this.oldValues = {
            'flex-end': 'end',
            'flex-start': 'start',
            'space-between': 'justify',
            'space-around': 'distribute'
        };
    }

    /**
     * Change property name for 2012 spec
     */
    prefixed(prop, prefix) {
        let spec;
        [spec, prefix] = flexSpec(prefix);
        if (spec === 2012) {
            return prefix + 'flex-line-pack';
        } else {
            return super.prefixed(prop, prefix);
        }
    }

    /**
     * Return property name by final spec
     */
    normalize() {
        return 'align-content';
    }

    /**
     * Change value for 2012 spec and ignore prefix for 2009
     */
    set(decl, prefix) {
        const spec = flexSpec(prefix)[0];
        if (spec === 2012) {
            decl.value = AlignContent.oldValues[decl.value] || decl.value;
            return super.set(decl, prefix);
        } else if (spec === 'final') {
            return super.set(decl, prefix);
        }
        return undefined;
    }
}
AlignContent.initClass();

module.exports = AlignContent;