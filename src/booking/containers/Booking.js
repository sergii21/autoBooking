import React, { Component } from "react";
import SimpleSelect from "../components/SimpleSelect";
import axios from "axios";
import { generatePath, withRouter } from "react-router-dom";

class Booking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      services: [],
      brands: [],
      styles: [],
      selectedService: null,
      selectedBrand: null,
      selectedStyle: null,
      isServicesLoading: false,
      isBrandsLoading: false,
      isStylesLoading: false,
    };
  }

  componentDidMount() {
    const { service_slug, brand_slug, style_slug } = this.props.match.params;
    this.parseLinks(service_slug, brand_slug, style_slug);
  }

  parseLinks(service_slug, brand_slug, style_slug) {
    if (service_slug && brand_slug && style_slug) {
      axios
        .get(
          `https://beta.autobooking.com/api/test/v1/search/parse_link?service_slug=${service_slug}&brand_slug=${brand_slug}&style_slug=${style_slug}`
        )
        .then((res) => {
          const { brand, service, style } = res.data;
          this.setState({
            styles: [style],
            brands: [brand],
            services: [service],
            selectedStyle: style,
            selectedBrand: brand,
            selectedService: service,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleServiceChange = (selected) => {
    this.setState(
      {
        selectedService: selected,
        services: selected ? [selected] : [],
      },
      () => {
        this.handleSelectChange();
      }
    );
  };

  handleServiceOpen = () => {
    const servicesURL = "https://beta.autobooking.com/api/test/v1/search/terms";

    this.setState({ isServicesLoading: true });
    axios
      .get(servicesURL)
      .then((res) => {
        const services = res.data.data;
        this.setState({ services });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => this.setState({ isServicesLoading: false }));
  };

  handleBrandChange = (selected) => {
    this.setState(
      {
        selectedBrand: selected,
        brands: selected ? [selected] : [],
      },
      () => {
        this.handleSelectChange();
      }
    );
  };

  handleBrandOpen = () => {
    const brandsURL =
      "https://beta.autobooking.com/api/test/v1/search/brands_terms";

    this.setState({ isBrandsLoading: true });
    axios
      .get(brandsURL)
      .then((res) => {
        const brands = res.data.data;
        this.setState({ brands });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => this.setState({ isBrandsLoading: false }));
  };

  handleStyleChange = (selected) => {
    this.setState(
      {
        selectedStyle: selected,
        styles: selected ? [selected] : [],
      },
      () => {
        this.handleSelectChange();
      }
    );
  };

  handleStyleOpen = () => {
    const stylesURL = "https://beta.autobooking.com/api/test/v1/search/styles";

    this.setState({ isStylesLoading: true });
    axios
      .get(stylesURL)
      .then((res) => {
        const styles = res.data.data;
        this.setState({ styles });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => this.setState({ isStylesLoading: false }));
  };

  handleSelectChange() {
    const { selectedBrand, selectedService, selectedStyle } = this.state;
    this.props.history.push({
      pathname: generatePath(this.props.match.path, {
        brand_slug: selectedBrand ? selectedBrand.slug : null,
        service_slug: selectedService ? selectedService.slug : null,
        style_slug: selectedStyle ? selectedStyle.slug : null,
      }),
    });
  }

  render() {
    return (
      <div>
        <SimpleSelect
          name="Service"
          items={this.state.services}
          value={this.state.selectedService}
          isLoading={this.state.isServicesLoading}
          handleChange={this.handleServiceChange}
          handleOpen={this.handleServiceOpen}
        ></SimpleSelect>
        <SimpleSelect
          name="Brand"
          items={this.state.brands}
          value={this.state.selectedBrand}
          isLoading={this.state.isBrandsLoading}
          handleChange={this.handleBrandChange}
          handleOpen={this.handleBrandOpen}
        ></SimpleSelect>
        <SimpleSelect
          name="Style"
          items={this.state.styles}
          value={this.state.selectedStyle}
          isLoading={this.state.isStylesLoading}
          handleChange={this.handleStyleChange}
          handleOpen={this.handleStyleOpen}
        ></SimpleSelect>
      </div>
    );
  }
}

export default withRouter(Booking);
