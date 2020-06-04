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
      service_slug: "",
      brand_slug: "",
      style_slug: "",
    };
  }

  componentDidMount() {
    const { service_slug, brand_slug, style_slug } = this.props.match.params;
    this.setState({ service_slug, brand_slug, style_slug });
    const servicesURL = "https://beta.autobooking.com/api/test/v1/search/terms";
    const brandsURL =
      "https://beta.autobooking.com/api/test/v1/search/brands_terms";
    const stylesURL = "https://beta.autobooking.com/api/test/v1/search/styles";

    axios
      .get(servicesURL)
      .then((res) => {
        const services = res.data.data;
        this.setState({ services });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(brandsURL)
      .then((res) => {
        const brands = res.data.data;
        this.setState({ brands });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(stylesURL)
      .then((res) => {
        const styles = res.data.data;
        this.setState({ styles });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleServiceChange = (service_slug) => {
    this.setState({ service_slug }, () => {
      this.handleSelectChange();
    });
  };

  handleBrandChange = (brandSlug) => {
    this.setState({ brand_slug: brandSlug }, () => {
      this.handleSelectChange();
    });
  };

  handleStyleChange = (style_slug) => {
    this.setState({ style_slug }, () => {
      this.handleSelectChange();
    });
  };

  handleSelectChange() {
    const { service_slug, brand_slug, style_slug } = this.state;
    this.props.history.push({
      pathname: generatePath(this.props.match.path, {
        service_slug,
        brand_slug,
        style_slug,
      }),
    });
  }

  render() {
    return (
      <div>
        <SimpleSelect
          name="Service"
          items={this.state.services}
          value={this.state.service_slug}
          handleChange={this.handleServiceChange}
        ></SimpleSelect>
        <SimpleSelect
          name="Brand"
          items={this.state.brands}
          value={this.state.brand_slug}
          handleChange={this.handleBrandChange}
        ></SimpleSelect>
        <SimpleSelect
          name="Style"
          items={this.state.styles}
          value={this.state.style_slug}
          handleChange={this.handleStyleChange}
        ></SimpleSelect>
      </div>
    );
  }
}

export default withRouter(Booking);
